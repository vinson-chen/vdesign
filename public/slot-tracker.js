/**
 * Vdesign SlotTracker — 基于 data-slot 的元素埋点追踪运行时
 *
 * 零依赖、独立脚本。通过事件代理捕获交互行为，基于 data-slot + data-slot-id
 * 构建全局唯一的元素标识路径，自动推断操作意图并上报。
 *
 * 业务代码无需任何改动，使用 Vdesign 组件即可自动获得埋点能力。
 *
 * 配置（可选）：
 *   window.__SLOT_TRACKER_CONFIG__ = {
 *     endpoint: '/api/track',       // 上报地址
 *     clickSampleRate: 1.0,         // 点击采样率
 *     focusSampleRate: 0.1,         // 聚焦采样率
 *     changeSampleRate: 0.1,        // 变更采样率
 *     throttleMs: 100,              // 节流间隔(ms)
 *     enabled: true,                // 是否启用
 *   }
 */

(function () {
  'use strict';

  // ============================================
  // 配置
  // ============================================
  const DEFAULT_CONFIG = {
    endpoint: '/api/track',
    clickSampleRate: 1.0,
    focusSampleRate: 0.1,
    changeSampleRate: 0.1,
    throttleMs: 100,
    enabled: true,
  };

  const config = Object.assign(
    {},
    DEFAULT_CONFIG,
    window.__SLOT_TRACKER_CONFIG__ || {}
  );

  // ============================================
  // 状态
  // ============================================
  var lastSend = 0;

  // ============================================
  // 路径构建：从当前元素向上收集 data-slot 链
  // ============================================
  function buildSlotPath(el) {
    var segments = [];
    var current = el;
    while (current && current !== document.body && current !== document.documentElement) {
      if (current.hasAttribute && current.hasAttribute('data-slot')) {
        var slot = current.getAttribute('data-slot');
        var slotId = current.getAttribute('data-slot-id') || '';
        segments.unshift(slotId ? slot + '#' + slotId : slot);
      }
      current = current.parentElement;
    }
    return segments.join(' > ') || 'unknown';
  }

  // ============================================
  // 意图推断：从 slot 类型 + 事件类型推导操作意图
  // ============================================
  function inferIntent(el, eventType) {
    var slot = el.getAttribute('data-slot') || '';
    var tag = el.tagName ? el.tagName.toLowerCase() : '';

    if (eventType === 'click') {
      if (slot === 'button') return 'primary_action';
      if (slot === 'navigation-item') return 'navigation';
      if (slot === 'checkbox' || slot === 'popover-checkbox-item') return 'toggle_selection';
      if (slot === 'switch') return 'toggle_state';
      if (slot === 'radio' || slot === 'popover-radio-item') return 'select_option';
      if (slot === 'pagination-button') return 'pagination';
      if (slot === 'tabs-trigger') return 'tab_switch';
      if (slot === 'select-trigger' || slot === 'select-editable-trigger') return 'open_dropdown';
      if (slot === 'select-item') return 'select_dropdown_item';
      if (slot === 'popover-item' || slot === 'popover-menu-item') return 'menu_action';
      if (slot === 'cell') return 'cell_interaction';
      if (slot === 'row') return 'row_interaction';
      if (slot === 'insert-row') return 'insert_row';
      if (slot === 'group-header') return 'toggle_group';
      if (slot === 'upload' || slot === 'upload-thumbnail') return 'upload_action';
      if (slot === 'dialog-content' || slot === 'drawer-content') return 'open_panel';
      if (slot === 'header-cell-dimension') return 'dimension_action';
      if (slot === 'header-cell-edit') return 'edit_column';
      if (slot === 'hide-column-view') return 'toggle_column_visibility';
      if (slot === 'button-link-manager') return 'link_action';
      if (tag === 'a') return 'link_click';
      return 'element_click';
    }

    if (eventType === 'focus') {
      if (slot === 'input' || tag === 'input' || tag === 'textarea') return 'input_focus';
      if (slot === 'select-trigger' || slot === 'select-editable-trigger') return 'select_focus';
      return 'element_focus';
    }

    if (eventType === 'change') {
      if (slot === 'input' || tag === 'input' || tag === 'textarea') return 'input_change';
      if (slot === 'checkbox') return 'checkbox_change';
      if (slot === 'switch') return 'switch_change';
      if (slot === 'radio') return 'radio_change';
      if (slot === 'select-value') return 'select_change';
      return 'element_change';
    }

    return 'unknown';
  }

  // ============================================
  // 采样控制
  // ============================================
  function shouldSample(eventType) {
    if (eventType === 'click') return Math.random() < config.clickSampleRate;
    if (eventType === 'focus') return Math.random() < config.focusSampleRate;
    if (eventType === 'change') return Math.random() < config.changeSampleRate;
    return false;
  }

  // ============================================
  // 节流控制
  // ============================================
  function isThrottled() {
    var now = Date.now();
    if (now - lastSend < config.throttleMs) return true;
    lastSend = now;
    return false;
  }

  // ============================================
  // 安全获取文本内容（截断，防止过长）
  // ============================================
  function safeText(el) {
    try {
      return (el.textContent || '').trim().slice(0, 100);
    } catch (e) {
      return '';
    }
  }

  // ============================================
  // 上报
  // ============================================
  function sendEvent(eventType, el) {
    if (!config.enabled) return;
    if (!shouldSample(eventType)) return;
    if (isThrottled()) return;

    var payload = {
      type: eventType,
      slot: el.getAttribute('data-slot') || null,
      slotId: el.getAttribute('data-slot-id') || null,
      path: buildSlotPath(el),
      intent: inferIntent(el, eventType),
      tag: el.tagName ? el.tagName.toLowerCase() : null,
      text: safeText(el),
      timestamp: Date.now(),
      url: window.location.href,
    };

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(config.endpoint, JSON.stringify(payload));
      }
    } catch (e) {
      // 静默失败 — 追踪不应中断业务
    }
  }

  // ============================================
  // 事件代理处理器
  // ============================================
  function handleEvent(event) {
    // 使用捕获阶段，在子元素阻止冒泡前即捕获
    var el = event.target;
    if (!el || !el.closest) return;
    var slotEl = el.closest('[data-slot]');
    if (!slotEl) return;
    sendEvent(event.type, slotEl);
  }

  // ============================================
  // 可见性观察（IntersectionObserver）
  // ============================================
  function initVisibilityObserver() {
    if (!window.IntersectionObserver) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            sendEvent('visibility', el);
          }
        });
      },
      { threshold: 0.5 }
    );

    // 对现有元素启动观察
    document.querySelectorAll('[data-slot]').forEach(function (el) {
      observer.observe(el);
    });

    // 对动态添加的元素也启动观察
    var mutationObs = new MutationObserver(function () {
      document.querySelectorAll('[data-slot]:not([data-slot-observed])').forEach(function (el) {
        el.setAttribute('data-slot-observed', 'true');
        observer.observe(el);
      });
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });
  }

  // ============================================
  // 初始化
  // ============================================
  function init() {
    // 事件代理（捕获阶段，优先级高于业务冒泡）
    document.addEventListener('click', handleEvent, true);
    document.addEventListener('focus', handleEvent, true);
    document.addEventListener('change', handleEvent, true);

    // 可见性观察
    initVisibilityObserver();
  }

  // 等待 DOM 就绪
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
