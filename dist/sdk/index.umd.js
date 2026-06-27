"use strict";
var VdataTracker = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    Collector: () => Collector,
    Reporter: () => Reporter,
    Tracker: () => Tracker,
    capturePageScreenshot: () => capturePageScreenshot,
    clearScreenshotCache: () => clearScreenshotCache,
    destroy: () => destroy,
    extractClickData: () => extractClickData,
    generateId: () => generateId,
    getBrowser: () => getBrowser,
    getClassName: () => getClassName,
    getDeviceType: () => getDeviceType,
    getElementScreenshot: () => getElementScreenshot,
    getElementText: () => getElementText,
    getInstance: () => getInstance,
    getOS: () => getOS,
    getScreenSize: () => getScreenSize,
    getXPath: () => getXPath,
    init: () => init,
    shouldSample: () => shouldSample,
    storage: () => storage
  });

  // src/utils.ts
  function getXPath(element) {
    if (element.id) {
      return `//*[@id="${element.id}"]`;
    }
    const parts = [];
    let current = element;
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      let index = 1;
      let sibling = current.previousElementSibling;
      while (sibling) {
        if (sibling.tagName === current.tagName) {
          index++;
        }
        sibling = sibling.previousElementSibling;
      }
      const tagName = current.tagName.toLowerCase();
      const indexStr = index > 1 ? `[${index}]` : "";
      parts.unshift(`${tagName}${indexStr}`);
      current = current.parentElement;
    }
    return "/" + parts.join("/");
  }
  function getElementText(element) {
    const text = element.textContent?.trim();
    return text ? text.slice(0, 50) : void 0;
  }
  function getClassName(element) {
    const className = element.className;
    if (typeof className === "string" && className) {
      return className.slice(0, 200);
    }
    return void 0;
  }
  function generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  function getDeviceType() {
    const ua = navigator.userAgent.toLowerCase();
    if (/ipad|tablet|playbook|silk/.test(ua)) {
      return "tablet";
    }
    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/.test(ua)) {
      return "mobile";
    }
    return "desktop";
  }
  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Safari")) return "Safari";
    if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
    if (ua.includes("Trident") || ua.includes("MSIE")) return "IE";
    return "Unknown";
  }
  function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes("Windows NT 10")) return "Windows 10";
    if (ua.includes("Windows NT 6.3")) return "Windows 8.1";
    if (ua.includes("Windows NT 6.2")) return "Windows 8";
    if (ua.includes("Windows NT 6.1")) return "Windows 7";
    if (ua.includes("Mac OS X")) {
      const match = ua.match(/Mac OS X (\d+[._]\d+)/);
      return match ? `macOS ${match[1].replace("_", ".")}` : "macOS";
    }
    if (ua.includes("Android")) {
      const match = ua.match(/Android (\d+\.?\d*)/);
      return match ? `Android ${match[1]}` : "Android";
    }
    if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) {
      const match = ua.match(/OS (\d+[._]\d+)/);
      return match ? `iOS ${match[1].replace("_", ".")}` : "iOS";
    }
    if (ua.includes("Linux")) return "Linux";
    return "Unknown";
  }
  function getScreenSize() {
    return `${screen.width}x${screen.height}`;
  }
  function shouldSample(sampleRate) {
    return Math.random() < sampleRate;
  }
  function extractClickData(event) {
    const target = event.target;
    const trackId = target.getAttribute("data-track-id") || void 0;
    let iconName = void 0;
    if (target.tagName.toLowerCase() === "svg" || target.closest("svg")) {
      const svgEl = target.tagName.toLowerCase() === "svg" ? target : target.closest("svg");
      if (svgEl) {
        const useEl = svgEl.querySelector("use");
        if (useEl) {
          const xlinkHref = useEl.getAttribute("xlink:href") || useEl.getAttribute("href");
          if (xlinkHref) {
            const match = xlinkHref.match(/#?(icon-[\w-]+)/);
            if (match) {
              iconName = match[1];
            }
          }
        }
      }
    }
    return {
      timestamp: Date.now(),
      x: event.clientX,
      y: event.clientY,
      page: window.location.pathname + window.location.hash,
      target: {
        tag: target.tagName.toLowerCase(),
        id: target.id || void 0,
        className: getClassName(target),
        xpath: getXPath(target),
        text: getElementText(target),
        trackId,
        iconName
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      scroll: {
        x: window.scrollX,
        y: window.scrollY
      }
    };
  }
  var storage = {
    get(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {
      }
    }
  };

  // src/reporter.ts
  var STORAGE_KEY_USER_ID = "__vdata_user_id__";
  var STORAGE_KEY_QUEUE = "__vdata_queue__";
  var Reporter = class {
    constructor(state) {
      this.batchTimer = null;
      this.state = state;
      this.init();
    }
    init() {
      const savedQueue = storage.get(STORAGE_KEY_QUEUE);
      if (savedQueue && savedQueue.length > 0) {
        this.state.eventQueue.push(...savedQueue);
        if (this.state.config.debug) {
          console.log("[Vdata] \u6062\u590D\u672A\u4E0A\u62A5\u4E8B\u4EF6:", savedQueue.length);
        }
      }
      this.startBatchTimer();
      window.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          this.flush();
        }
      });
      window.addEventListener("pagehide", () => {
        this.flush();
      });
    }
    /**
     * 添加事件到队列
     */
    addEvent(event) {
      this.state.eventQueue.push(event);
      this.saveQueue();
      const { batchSize = 10 } = this.state.config;
      if (this.state.eventQueue.length >= batchSize) {
        this.flush();
      }
    }
    /**
     * 立即上报所有事件
     */
    flush() {
      if (this.state.eventQueue.length === 0) return;
      const events = [...this.state.eventQueue];
      this.state.eventQueue = [];
      this.saveQueue();
      this.report(events);
    }
    /**
     * 上报数据到服务端
     */
    async report(events) {
      const { config, userId } = this.state;
      const payload = {
        appId: config.appId,
        userId,
        userRole: config.userRole,
        deviceType: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        screenSize: getScreenSize(),
        events,
        reportedAt: Date.now()
      };
      if (config.debug) {
        console.log("[Vdata] \u4E0A\u62A5\u6570\u636E:", payload);
      }
      try {
        const data = JSON.stringify(payload);
        let sent = false;
        if (navigator.sendBeacon) {
          const blob = new Blob([data], { type: "application/json" });
          sent = navigator.sendBeacon(config.serverUrl, blob);
        }
        if (!sent) {
          await fetch(config.serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data,
            keepalive: true
          });
        }
        if (config.debug) {
          console.log("[Vdata] \u4E0A\u62A5\u6210\u529F:", events.length, "\u6761\u4E8B\u4EF6");
        }
      } catch (error) {
        if (config.debug) {
          console.error("[Vdata] \u4E0A\u62A5\u5931\u8D25:", error);
        }
        this.state.eventQueue.unshift(...events);
        this.saveQueue();
      }
    }
    /**
     * 保存队列到 localStorage
     */
    saveQueue() {
      storage.set(STORAGE_KEY_QUEUE, this.state.eventQueue);
    }
    /**
     * 启动定时批量上报
     */
    startBatchTimer() {
      const { batchInterval = 5e3 } = this.state.config;
      this.batchTimer = window.setInterval(() => {
        if (this.state.eventQueue.length > 0) {
          this.flush();
        }
      }, batchInterval);
    }
    /**
     * 停止定时器
     */
    destroy() {
      if (this.batchTimer) {
        clearInterval(this.batchTimer);
        this.batchTimer = null;
      }
    }
  };
  function getUserId(config) {
    if (config.userId) {
      return config.userId;
    }
    let userId = storage.get(STORAGE_KEY_USER_ID);
    if (!userId) {
      userId = generateId();
      storage.set(STORAGE_KEY_USER_ID, userId);
    }
    return userId;
  }

  // src/collector.ts
  var Collector = class {
    constructor(onCollect, filter) {
      this.onCollect = onCollect;
      this.filter = filter;
      this.handleClick = this.handle.bind(this);
      this.start();
    }
    start() {
      document.addEventListener("click", this.handleClick, false);
    }
    handle(event) {
      if (event.button !== 0) return;
      const target = event.target;
      const clickEvent = extractClickData(event);
      if (this.filter && !this.filter(clickEvent)) {
        return;
      }
      this.onCollect(clickEvent, target);
    }
    /**
     * 停止采集
     */
    destroy() {
      document.removeEventListener("click", this.handleClick, false);
    }
  };

  // ../../node_modules/.pnpm/modern-screenshot@4.7.0/node_modules/modern-screenshot/dist/index.mjs
  function changeJpegDpi(uint8Array, dpi) {
    uint8Array[13] = 1;
    uint8Array[14] = dpi >> 8;
    uint8Array[15] = dpi & 255;
    uint8Array[16] = dpi >> 8;
    uint8Array[17] = dpi & 255;
    return uint8Array;
  }
  var _P = "p".charCodeAt(0);
  var _H = "H".charCodeAt(0);
  var _Y = "Y".charCodeAt(0);
  var _S = "s".charCodeAt(0);
  var pngDataTable;
  function createPngDataTable() {
    const crcTable = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      crcTable[n] = c;
    }
    return crcTable;
  }
  function calcCrc(uint8Array) {
    let c = -1;
    if (!pngDataTable)
      pngDataTable = createPngDataTable();
    for (let n = 0; n < uint8Array.length; n++) {
      c = pngDataTable[(c ^ uint8Array[n]) & 255] ^ c >>> 8;
    }
    return c ^ -1;
  }
  function searchStartOfPhys(uint8Array) {
    const length = uint8Array.length - 1;
    for (let i = length; i >= 4; i--) {
      if (uint8Array[i - 4] === 9 && uint8Array[i - 3] === _P && uint8Array[i - 2] === _H && uint8Array[i - 1] === _Y && uint8Array[i] === _S) {
        return i - 3;
      }
    }
    return 0;
  }
  function changePngDpi(uint8Array, dpi, overwritepHYs = false) {
    const physChunk = new Uint8Array(13);
    dpi *= 39.3701;
    physChunk[0] = _P;
    physChunk[1] = _H;
    physChunk[2] = _Y;
    physChunk[3] = _S;
    physChunk[4] = dpi >>> 24;
    physChunk[5] = dpi >>> 16;
    physChunk[6] = dpi >>> 8;
    physChunk[7] = dpi & 255;
    physChunk[8] = physChunk[4];
    physChunk[9] = physChunk[5];
    physChunk[10] = physChunk[6];
    physChunk[11] = physChunk[7];
    physChunk[12] = 1;
    const crc = calcCrc(physChunk);
    const crcChunk = new Uint8Array(4);
    crcChunk[0] = crc >>> 24;
    crcChunk[1] = crc >>> 16;
    crcChunk[2] = crc >>> 8;
    crcChunk[3] = crc & 255;
    if (overwritepHYs) {
      const startingIndex = searchStartOfPhys(uint8Array);
      uint8Array.set(physChunk, startingIndex);
      uint8Array.set(crcChunk, startingIndex + 13);
      return uint8Array;
    } else {
      const chunkLength = new Uint8Array(4);
      chunkLength[0] = 0;
      chunkLength[1] = 0;
      chunkLength[2] = 0;
      chunkLength[3] = 9;
      const finalHeader = new Uint8Array(54);
      finalHeader.set(uint8Array, 0);
      finalHeader.set(chunkLength, 33);
      finalHeader.set(physChunk, 37);
      finalHeader.set(crcChunk, 50);
      return finalHeader;
    }
  }
  var b64PhysSignature1 = "AAlwSFlz";
  var b64PhysSignature2 = "AAAJcEhZ";
  var b64PhysSignature3 = "AAAACXBI";
  function detectPhysChunkFromDataUrl(dataUrl) {
    let b64index = dataUrl.indexOf(b64PhysSignature1);
    if (b64index === -1) {
      b64index = dataUrl.indexOf(b64PhysSignature2);
    }
    if (b64index === -1) {
      b64index = dataUrl.indexOf(b64PhysSignature3);
    }
    return b64index;
  }
  var PREFIX = "[modern-screenshot]";
  var IN_BROWSER = typeof window !== "undefined";
  var SUPPORT_WEB_WORKER = IN_BROWSER && "Worker" in window;
  var SUPPORT_ATOB = IN_BROWSER && "atob" in window;
  var SUPPORT_BTOA = IN_BROWSER && "btoa" in window;
  var USER_AGENT = IN_BROWSER ? window.navigator?.userAgent : "";
  var IN_CHROME = USER_AGENT.includes("Chrome");
  var IN_SAFARI = USER_AGENT.includes("AppleWebKit") && !IN_CHROME;
  var IN_FIREFOX = USER_AGENT.includes("Firefox");
  var isContext = (value) => value && "__CONTEXT__" in value;
  var isCssFontFaceRule = (rule) => rule.constructor.name === "CSSFontFaceRule";
  var isCSSImportRule = (rule) => rule.constructor.name === "CSSImportRule";
  var isLayerBlockRule = (rule) => rule.constructor.name === "CSSLayerBlockRule";
  var isElementNode = (node) => node.nodeType === 1;
  var isSVGElementNode = (node) => typeof node.className === "object";
  var isSVGImageElementNode = (node) => node.tagName === "image";
  var isSVGUseElementNode = (node) => node.tagName === "use";
  var isHTMLElementNode = (node) => isElementNode(node) && typeof node.style !== "undefined" && !isSVGElementNode(node);
  var isCommentNode = (node) => node.nodeType === 8;
  var isTextNode = (node) => node.nodeType === 3;
  var isImageElement = (node) => node.tagName === "IMG";
  var isVideoElement = (node) => node.tagName === "VIDEO";
  var isCanvasElement = (node) => node.tagName === "CANVAS";
  var isTextareaElement = (node) => node.tagName === "TEXTAREA";
  var isInputElement = (node) => node.tagName === "INPUT";
  var isStyleElement = (node) => node.tagName === "STYLE";
  var isScriptElement = (node) => node.tagName === "SCRIPT";
  var isSelectElement = (node) => node.tagName === "SELECT";
  var isSlotElement = (node) => node.tagName === "SLOT";
  var isIFrameElement = (node) => node.tagName === "IFRAME";
  var consoleWarn = (...args) => console.warn(PREFIX, ...args);
  function supportWebp(ownerDocument) {
    const canvas = ownerDocument?.createElement?.("canvas");
    if (canvas) {
      canvas.height = canvas.width = 1;
    }
    return Boolean(canvas) && "toDataURL" in canvas && Boolean(canvas.toDataURL("image/webp").includes("image/webp"));
  }
  var isDataUrl = (url) => url.startsWith("data:");
  function resolveUrl(url, baseUrl) {
    if (url.match(/^[a-z]+:\/\//i))
      return url;
    if (IN_BROWSER && url.match(/^\/\//))
      return window.location.protocol + url;
    if (url.match(/^[a-z]+:/i))
      return url;
    if (!IN_BROWSER)
      return url;
    const doc = getDocument().implementation.createHTMLDocument();
    const base = doc.createElement("base");
    const a = doc.createElement("a");
    doc.head.appendChild(base);
    doc.body.appendChild(a);
    if (baseUrl)
      base.href = baseUrl;
    a.href = url;
    return a.href;
  }
  function getDocument(target) {
    return (target && isElementNode(target) ? target?.ownerDocument : target) ?? window.document;
  }
  var XMLNS = "http://www.w3.org/2000/svg";
  function createSvg(width, height, ownerDocument) {
    const svg = getDocument(ownerDocument).createElementNS(XMLNS, "svg");
    svg.setAttributeNS(null, "width", width.toString());
    svg.setAttributeNS(null, "height", height.toString());
    svg.setAttributeNS(null, "viewBox", `0 0 ${width} ${height}`);
    return svg;
  }
  function svgToDataUrl(svg, removeControlCharacter) {
    let xhtml = new XMLSerializer().serializeToString(svg);
    if (removeControlCharacter) {
      xhtml = xhtml.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu, "");
    }
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xhtml)}`;
  }
  function readBlob(blob, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.onabort = () => reject(new Error(`Failed read blob to ${type}`));
      if (type === "dataUrl") {
        reader.readAsDataURL(blob);
      } else if (type === "arrayBuffer") {
        reader.readAsArrayBuffer(blob);
      }
    });
  }
  var blobToDataUrl = (blob) => readBlob(blob, "dataUrl");
  function createImage(url, ownerDocument) {
    const img = getDocument(ownerDocument).createElement("img");
    img.decoding = "sync";
    img.loading = "eager";
    img.src = url;
    return img;
  }
  function loadMedia(media, options) {
    return new Promise((resolve) => {
      const { timeout, ownerDocument, onError: userOnError, onWarn } = options ?? {};
      const node = typeof media === "string" ? createImage(media, getDocument(ownerDocument)) : media;
      let timer = null;
      let removeEventListeners = null;
      function onResolve() {
        resolve(node);
        timer && clearTimeout(timer);
        removeEventListeners?.();
      }
      if (timeout) {
        timer = setTimeout(onResolve, timeout);
      }
      if (isVideoElement(node)) {
        const currentSrc = node.currentSrc || node.src;
        if (!currentSrc) {
          if (node.poster) {
            return loadMedia(node.poster, options).then(resolve);
          }
          return onResolve();
        }
        if (node.readyState >= 2) {
          return onResolve();
        }
        const onLoadeddata = onResolve;
        const onError = (error) => {
          onWarn?.(
            "Failed video load",
            currentSrc,
            error
          );
          userOnError?.(error);
          onResolve();
        };
        removeEventListeners = () => {
          node.removeEventListener("loadeddata", onLoadeddata);
          node.removeEventListener("error", onError);
        };
        node.addEventListener("loadeddata", onLoadeddata, { once: true });
        node.addEventListener("error", onError, { once: true });
      } else {
        const currentSrc = isSVGImageElementNode(node) ? node.href.baseVal : node.currentSrc || node.src;
        if (!currentSrc) {
          return onResolve();
        }
        const onLoad = async () => {
          if (isImageElement(node) && "decode" in node) {
            try {
              await node.decode();
            } catch (error) {
              onWarn?.(
                "Failed to decode image, trying to render anyway",
                node.dataset.originalSrc || currentSrc,
                error
              );
            }
          }
          onResolve();
        };
        const onError = (error) => {
          onWarn?.(
            "Failed image load",
            node.dataset.originalSrc || currentSrc,
            error
          );
          onResolve();
        };
        if (isImageElement(node) && node.complete) {
          return onLoad();
        }
        removeEventListeners = () => {
          node.removeEventListener("load", onLoad);
          node.removeEventListener("error", onError);
        };
        node.addEventListener("load", onLoad, { once: true });
        node.addEventListener("error", onError, { once: true });
      }
    });
  }
  async function waitUntilLoad(node, options) {
    if (isHTMLElementNode(node)) {
      if (isImageElement(node) || isVideoElement(node)) {
        await loadMedia(node, options);
      } else {
        await Promise.all(
          ["img", "video"].flatMap((selectors) => {
            return Array.from(node.querySelectorAll(selectors)).map((el) => loadMedia(el, options));
          })
        );
      }
    }
  }
  var uuid = /* @__PURE__ */ function uuid2() {
    let counter = 0;
    const random = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
    return () => {
      counter += 1;
      return `u${random()}${counter}`;
    };
  }();
  function splitFontFamily(fontFamily) {
    return fontFamily?.split(",").map((val) => val.trim().replace(/"|'/g, "").toLowerCase()).filter(Boolean);
  }
  var uid = 0;
  function createLogger(debug) {
    const prefix = `${PREFIX}[#${uid}]`;
    uid++;
    return {
      // eslint-disable-next-line no-console
      time: (label) => debug && console.time(`${prefix} ${label}`),
      // eslint-disable-next-line no-console
      timeEnd: (label) => debug && console.timeEnd(`${prefix} ${label}`),
      warn: (...args) => debug && consoleWarn(...args)
    };
  }
  function getDefaultRequestInit(bypassingCache) {
    return {
      cache: bypassingCache ? "no-cache" : "force-cache"
    };
  }
  async function orCreateContext(node, options) {
    return isContext(node) ? node : createContext(node, { ...options, autoDestruct: true });
  }
  async function createContext(node, options) {
    const { scale = 1, workerUrl, workerNumber = 1 } = options || {};
    const debug = Boolean(options?.debug);
    const features = options?.features ?? true;
    const ownerDocument = node.ownerDocument ?? (IN_BROWSER ? window.document : void 0);
    const ownerWindow = node.ownerDocument?.defaultView ?? (IN_BROWSER ? window : void 0);
    const requests = /* @__PURE__ */ new Map();
    const context = {
      // Options
      width: 0,
      height: 0,
      quality: 1,
      type: "image/png",
      scale,
      backgroundColor: null,
      style: null,
      filter: null,
      maximumCanvasSize: 0,
      timeout: 3e4,
      progress: null,
      debug,
      fetch: {
        requestInit: getDefaultRequestInit(options?.fetch?.bypassingCache),
        placeholderImage: "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        bypassingCache: false,
        ...options?.fetch
      },
      fetchFn: null,
      font: {},
      drawImageInterval: 100,
      workerUrl: null,
      workerNumber,
      onCloneEachNode: null,
      onCloneNode: null,
      onEmbedNode: null,
      onCreateForeignObjectSvg: null,
      includeStyleProperties: null,
      autoDestruct: false,
      ...options,
      // InternalContext
      __CONTEXT__: true,
      log: createLogger(debug),
      node,
      ownerDocument,
      ownerWindow,
      dpi: scale === 1 ? null : 96 * scale,
      svgStyleElement: createStyleElement(ownerDocument),
      svgDefsElement: ownerDocument?.createElementNS(XMLNS, "defs"),
      svgStyles: /* @__PURE__ */ new Map(),
      defaultComputedStyles: /* @__PURE__ */ new Map(),
      workers: [
        ...Array.from({
          length: SUPPORT_WEB_WORKER && workerUrl && workerNumber ? workerNumber : 0
        })
      ].map(() => {
        try {
          const worker = new Worker(workerUrl);
          worker.onmessage = async (event) => {
            const { url, result } = event.data;
            if (result) {
              requests.get(url)?.resolve?.(result);
            } else {
              requests.get(url)?.reject?.(new Error(`Error receiving message from worker: ${url}`));
            }
          };
          worker.onmessageerror = (event) => {
            const { url } = event.data;
            requests.get(url)?.reject?.(new Error(`Error receiving message from worker: ${url}`));
          };
          return worker;
        } catch (error) {
          context.log.warn("Failed to new Worker", error);
          return null;
        }
      }).filter(Boolean),
      fontFamilies: /* @__PURE__ */ new Map(),
      fontCssTexts: /* @__PURE__ */ new Map(),
      acceptOfImage: `${[
        supportWebp(ownerDocument) && "image/webp",
        "image/svg+xml",
        "image/*",
        "*/*"
      ].filter(Boolean).join(",")};q=0.8`,
      requests,
      drawImageCount: 0,
      tasks: [],
      features,
      isEnable: (key) => {
        if (key === "restoreScrollPosition") {
          return typeof features === "boolean" ? false : features[key] ?? false;
        }
        if (typeof features === "boolean") {
          return features;
        }
        return features[key] ?? true;
      },
      shadowRoots: []
    };
    context.log.time("wait until load");
    await waitUntilLoad(node, { timeout: context.timeout, onWarn: context.log.warn });
    context.log.timeEnd("wait until load");
    const { width, height } = resolveBoundingBox(node, context);
    context.width = width;
    context.height = height;
    return context;
  }
  function createStyleElement(ownerDocument) {
    if (!ownerDocument)
      return void 0;
    const style = ownerDocument.createElement("style");
    const cssText = style.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);
    style.appendChild(cssText);
    return style;
  }
  function resolveBoundingBox(node, context) {
    let { width, height } = context;
    if (isElementNode(node) && (!width || !height)) {
      const box = node.getBoundingClientRect();
      width = width || box.width || Number(node.getAttribute("width")) || 0;
      height = height || box.height || Number(node.getAttribute("height")) || 0;
    }
    return { width, height };
  }
  async function imageToCanvas(image, context) {
    const {
      log,
      timeout,
      drawImageCount,
      drawImageInterval
    } = context;
    log.time("image to canvas");
    const loaded = await loadMedia(image, { timeout, onWarn: context.log.warn });
    const { canvas, context2d } = createCanvas(image.ownerDocument, context);
    const drawImage = () => {
      try {
        context2d?.drawImage(loaded, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        context.log.warn("Failed to drawImage", error);
      }
    };
    drawImage();
    if (context.isEnable("fixSvgXmlDecode")) {
      for (let i = 0; i < drawImageCount; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            context2d?.clearRect(0, 0, canvas.width, canvas.height);
            drawImage();
            resolve();
          }, i + drawImageInterval);
        });
      }
    }
    context.drawImageCount = 0;
    log.timeEnd("image to canvas");
    return canvas;
  }
  function createCanvas(ownerDocument, context) {
    const { width, height, scale, backgroundColor, maximumCanvasSize: max } = context;
    const canvas = ownerDocument.createElement("canvas");
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    if (max) {
      if (canvas.width > max || canvas.height > max) {
        if (canvas.width > max && canvas.height > max) {
          if (canvas.width > canvas.height) {
            canvas.height *= max / canvas.width;
            canvas.width = max;
          } else {
            canvas.width *= max / canvas.height;
            canvas.height = max;
          }
        } else if (canvas.width > max) {
          canvas.height *= max / canvas.width;
          canvas.width = max;
        } else {
          canvas.width *= max / canvas.height;
          canvas.height = max;
        }
      }
    }
    const context2d = canvas.getContext("2d");
    if (context2d && backgroundColor) {
      context2d.fillStyle = backgroundColor;
      context2d.fillRect(0, 0, canvas.width, canvas.height);
    }
    return { canvas, context2d };
  }
  function cloneCanvas(canvas, context) {
    if (canvas.ownerDocument) {
      try {
        const dataURL = canvas.toDataURL();
        if (dataURL !== "data:,") {
          return createImage(dataURL, canvas.ownerDocument);
        }
      } catch (error) {
        context.log.warn("Failed to clone canvas", error);
      }
    }
    const cloned = canvas.cloneNode(false);
    const ctx = canvas.getContext("2d");
    const clonedCtx = cloned.getContext("2d");
    try {
      if (ctx && clonedCtx) {
        clonedCtx.putImageData(
          ctx.getImageData(0, 0, canvas.width, canvas.height),
          0,
          0
        );
      }
      return cloned;
    } catch (error) {
      context.log.warn("Failed to clone canvas", error);
    }
    return cloned;
  }
  function cloneIframe(iframe, context) {
    try {
      if (iframe?.contentDocument?.documentElement) {
        return cloneNode(iframe.contentDocument.documentElement, context);
      }
    } catch (error) {
      context.log.warn("Failed to clone iframe", error);
    }
    return iframe.cloneNode(false);
  }
  function cloneImage(image) {
    const cloned = image.cloneNode(false);
    if (image.currentSrc && image.currentSrc !== image.src) {
      cloned.src = image.currentSrc;
      cloned.srcset = "";
    }
    if (cloned.loading === "lazy") {
      cloned.loading = "eager";
    }
    return cloned;
  }
  async function cloneVideo(video, context) {
    if (video.ownerDocument && !video.currentSrc && video.poster) {
      return createImage(video.poster, video.ownerDocument);
    }
    const cloned = video.cloneNode(false);
    cloned.crossOrigin = "anonymous";
    if (video.currentSrc && video.currentSrc !== video.src) {
      cloned.src = video.currentSrc;
    }
    const ownerDocument = cloned.ownerDocument;
    if (ownerDocument) {
      let canPlay = true;
      await loadMedia(cloned, { onError: () => canPlay = false, onWarn: context.log.warn });
      if (!canPlay) {
        if (video.poster) {
          return createImage(video.poster, video.ownerDocument);
        }
        return cloned;
      }
      cloned.currentTime = video.currentTime;
      await new Promise((resolve) => {
        cloned.addEventListener("seeked", resolve, { once: true });
      });
      const canvas = ownerDocument.createElement("canvas");
      canvas.width = video.offsetWidth;
      canvas.height = video.offsetHeight;
      try {
        const ctx = canvas.getContext("2d");
        if (ctx)
          ctx.drawImage(cloned, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        context.log.warn("Failed to clone video", error);
        if (video.poster) {
          return createImage(video.poster, video.ownerDocument);
        }
        return cloned;
      }
      return cloneCanvas(canvas, context);
    }
    return cloned;
  }
  function cloneElement(node, context) {
    if (isCanvasElement(node)) {
      return cloneCanvas(node, context);
    }
    if (isIFrameElement(node)) {
      return cloneIframe(node, context);
    }
    if (isImageElement(node)) {
      return cloneImage(node);
    }
    if (isVideoElement(node)) {
      return cloneVideo(node, context);
    }
    return node.cloneNode(false);
  }
  function getSandBox(context) {
    let sandbox = context.sandbox;
    if (!sandbox) {
      const { ownerDocument } = context;
      try {
        if (ownerDocument) {
          sandbox = ownerDocument.createElement("iframe");
          sandbox.id = `__SANDBOX__${uuid()}`;
          sandbox.width = "0";
          sandbox.height = "0";
          sandbox.style.visibility = "hidden";
          sandbox.style.position = "fixed";
          ownerDocument.body.appendChild(sandbox);
          sandbox.srcdoc = '<!DOCTYPE html><meta charset="UTF-8"><title></title><body>';
          context.sandbox = sandbox;
        }
      } catch (error) {
        context.log.warn("Failed to getSandBox", error);
      }
    }
    return sandbox;
  }
  var ignoredStyles = [
    "width",
    "height",
    "-webkit-text-fill-color"
  ];
  var includedAttributes = [
    "stroke",
    "fill"
  ];
  function getDefaultStyle(node, pseudoElement, context) {
    const { defaultComputedStyles } = context;
    const nodeName = node.nodeName.toLowerCase();
    const isSvgNode = isSVGElementNode(node) && nodeName !== "svg";
    const attributes = isSvgNode ? includedAttributes.map((name) => [name, node.getAttribute(name)]).filter(([, value]) => value !== null) : [];
    const key = [
      isSvgNode && "svg",
      nodeName,
      attributes.map((name, value) => `${name}=${value}`).join(","),
      pseudoElement
    ].filter(Boolean).join(":");
    if (defaultComputedStyles.has(key))
      return defaultComputedStyles.get(key);
    const sandbox = getSandBox(context);
    const sandboxWindow = sandbox?.contentWindow;
    if (!sandboxWindow)
      return /* @__PURE__ */ new Map();
    const sandboxDocument = sandboxWindow?.document;
    let root;
    let el;
    if (isSvgNode) {
      root = sandboxDocument.createElementNS(XMLNS, "svg");
      el = root.ownerDocument.createElementNS(root.namespaceURI, nodeName);
      attributes.forEach(([name, value]) => {
        el.setAttributeNS(null, name, value);
      });
      root.appendChild(el);
    } else {
      root = el = sandboxDocument.createElement(nodeName);
    }
    el.textContent = " ";
    sandboxDocument.body.appendChild(root);
    const computedStyle = sandboxWindow.getComputedStyle(el, pseudoElement);
    const styles = /* @__PURE__ */ new Map();
    for (let len = computedStyle.length, i = 0; i < len; i++) {
      const name = computedStyle.item(i);
      if (ignoredStyles.includes(name))
        continue;
      styles.set(name, computedStyle.getPropertyValue(name));
    }
    sandboxDocument.body.removeChild(root);
    defaultComputedStyles.set(key, styles);
    return styles;
  }
  function getDiffStyle(style, defaultStyle, includeStyleProperties) {
    const diffStyle = /* @__PURE__ */ new Map();
    const prefixs = [];
    const prefixTree = /* @__PURE__ */ new Map();
    if (includeStyleProperties) {
      for (const name of includeStyleProperties) {
        applyTo(name);
      }
    } else {
      for (let len = style.length, i = 0; i < len; i++) {
        const name = style.item(i);
        applyTo(name);
      }
    }
    for (let len = prefixs.length, i = 0; i < len; i++) {
      prefixTree.get(prefixs[i])?.forEach((value, name) => diffStyle.set(name, value));
    }
    function applyTo(name) {
      const value = style.getPropertyValue(name);
      const priority = style.getPropertyPriority(name);
      const subIndex = name.lastIndexOf("-");
      const prefix = subIndex > -1 ? name.substring(0, subIndex) : void 0;
      if (prefix) {
        let map = prefixTree.get(prefix);
        if (!map) {
          map = /* @__PURE__ */ new Map();
          prefixTree.set(prefix, map);
        }
        map.set(name, [value, priority]);
      }
      if (defaultStyle.get(name) === value && !priority)
        return;
      if (prefix) {
        prefixs.push(prefix);
      } else {
        diffStyle.set(name, [value, priority]);
      }
    }
    return diffStyle;
  }
  function copyCssStyles(node, cloned, isRoot, context) {
    const { ownerWindow, includeStyleProperties, currentParentNodeStyle } = context;
    const clonedStyle = cloned.style;
    const computedStyle = ownerWindow.getComputedStyle(node);
    const defaultStyle = getDefaultStyle(node, null, context);
    currentParentNodeStyle?.forEach((_, key) => {
      defaultStyle.delete(key);
    });
    const style = getDiffStyle(computedStyle, defaultStyle, includeStyleProperties);
    style.delete("transition-property");
    style.delete("all");
    style.delete("d");
    style.delete("content");
    if (isRoot) {
      style.delete("position");
      style.delete("margin-top");
      style.delete("margin-right");
      style.delete("margin-bottom");
      style.delete("margin-left");
      style.delete("margin-block-start");
      style.delete("margin-block-end");
      style.delete("margin-inline-start");
      style.delete("margin-inline-end");
      style.set("box-sizing", ["border-box", ""]);
    }
    if (style.get("background-clip")?.[0] === "text") {
      cloned.classList.add("______background-clip--text");
    }
    if (IN_CHROME) {
      if (!style.has("font-kerning"))
        style.set("font-kerning", ["normal", ""]);
      if ((style.get("overflow-x")?.[0] === "hidden" || style.get("overflow-y")?.[0] === "hidden") && style.get("text-overflow")?.[0] === "ellipsis" && node.scrollWidth === node.clientWidth) {
        style.set("text-overflow", ["clip", ""]);
      }
    }
    for (let len = clonedStyle.length, i = 0; i < len; i++) {
      clonedStyle.removeProperty(clonedStyle.item(i));
    }
    style.forEach(([value, priority], name) => {
      clonedStyle.setProperty(name, value, priority);
    });
    return style;
  }
  function copyInputValue(node, cloned) {
    if (isTextareaElement(node) || isInputElement(node) || isSelectElement(node)) {
      cloned.setAttribute("value", node.value);
    }
  }
  var pseudoClasses = [
    "::before",
    "::after"
    // '::placeholder', TODO
  ];
  var scrollbarPseudoClasses = [
    "::-webkit-scrollbar",
    "::-webkit-scrollbar-button",
    // '::-webkit-scrollbar:horizontal', TODO
    "::-webkit-scrollbar-thumb",
    "::-webkit-scrollbar-track",
    "::-webkit-scrollbar-track-piece",
    // '::-webkit-scrollbar:vertical', TODO
    "::-webkit-scrollbar-corner",
    "::-webkit-resizer"
  ];
  function copyPseudoClass(node, cloned, copyScrollbar, context, addWordToFontFamilies) {
    const { ownerWindow, svgStyleElement, svgStyles, currentNodeStyle } = context;
    if (!svgStyleElement || !ownerWindow)
      return;
    function copyBy(pseudoClass) {
      const computedStyle = ownerWindow.getComputedStyle(node, pseudoClass);
      let content = computedStyle.getPropertyValue("content");
      if (!content || content === "none")
        return;
      addWordToFontFamilies?.(content);
      content = content.replace(/(')|(")|(counter\(.+\))/g, "");
      const klasses = [uuid()];
      const defaultStyle = getDefaultStyle(node, pseudoClass, context);
      currentNodeStyle?.forEach((_, key) => {
        defaultStyle.delete(key);
      });
      const style = getDiffStyle(computedStyle, defaultStyle, context.includeStyleProperties);
      style.delete("content");
      style.delete("-webkit-locale");
      if (style.get("background-clip")?.[0] === "text") {
        cloned.classList.add("______background-clip--text");
      }
      const cloneStyle = [
        `content: '${content}';`
      ];
      style.forEach(([value, priority], name) => {
        cloneStyle.push(`${name}: ${value}${priority ? " !important" : ""};`);
      });
      if (cloneStyle.length === 1)
        return;
      try {
        cloned.className = [cloned.className, ...klasses].join(" ");
      } catch (err) {
        context.log.warn("Failed to copyPseudoClass", err);
        return;
      }
      const cssText = cloneStyle.join("\n  ");
      let allClasses = svgStyles.get(cssText);
      if (!allClasses) {
        allClasses = [];
        svgStyles.set(cssText, allClasses);
      }
      allClasses.push(`.${klasses[0]}${pseudoClass}`);
    }
    pseudoClasses.forEach(copyBy);
    if (copyScrollbar)
      scrollbarPseudoClasses.forEach(copyBy);
  }
  var excludeParentNodes = /* @__PURE__ */ new Set([
    "symbol"
    // test/fixtures/svg.symbol.html
  ]);
  async function appendChildNode(node, cloned, child, context, addWordToFontFamilies) {
    if (isElementNode(child) && (isStyleElement(child) || isScriptElement(child)))
      return;
    if (context.filter && !context.filter(child))
      return;
    if (excludeParentNodes.has(cloned.nodeName) || excludeParentNodes.has(child.nodeName)) {
      context.currentParentNodeStyle = void 0;
    } else {
      context.currentParentNodeStyle = context.currentNodeStyle;
    }
    const childCloned = await cloneNode(child, context, false, addWordToFontFamilies);
    if (context.isEnable("restoreScrollPosition")) {
      restoreScrollPosition(node, childCloned);
    }
    cloned.appendChild(childCloned);
  }
  async function cloneChildNodes(node, cloned, context, addWordToFontFamilies) {
    let firstChild = node.firstChild;
    if (isElementNode(node)) {
      if (node.shadowRoot) {
        firstChild = node.shadowRoot?.firstChild;
        context.shadowRoots.push(node.shadowRoot);
      }
    }
    for (let child = firstChild; child; child = child.nextSibling) {
      if (isCommentNode(child))
        continue;
      if (isElementNode(child) && isSlotElement(child) && typeof child.assignedNodes === "function") {
        const nodes = child.assignedNodes();
        for (let i = 0; i < nodes.length; i++) {
          await appendChildNode(node, cloned, nodes[i], context, addWordToFontFamilies);
        }
      } else {
        await appendChildNode(node, cloned, child, context, addWordToFontFamilies);
      }
    }
  }
  function restoreScrollPosition(node, chlidCloned) {
    if (!isHTMLElementNode(node) || !isHTMLElementNode(chlidCloned))
      return;
    const { scrollTop, scrollLeft } = node;
    if (!scrollTop && !scrollLeft) {
      return;
    }
    const { transform } = chlidCloned.style;
    const matrix = new DOMMatrix(transform);
    const { a, b, c, d } = matrix;
    matrix.a = 1;
    matrix.b = 0;
    matrix.c = 0;
    matrix.d = 1;
    matrix.translateSelf(-scrollLeft, -scrollTop);
    matrix.a = a;
    matrix.b = b;
    matrix.c = c;
    matrix.d = d;
    chlidCloned.style.transform = matrix.toString();
  }
  function applyCssStyleWithOptions(cloned, context) {
    const { backgroundColor, width, height, style: styles } = context;
    const clonedStyle = cloned.style;
    if (backgroundColor)
      clonedStyle.setProperty("background-color", backgroundColor, "important");
    if (width)
      clonedStyle.setProperty("width", `${width}px`, "important");
    if (height)
      clonedStyle.setProperty("height", `${height}px`, "important");
    if (styles) {
      for (const name in styles) clonedStyle[name] = styles[name];
    }
  }
  var NORMAL_ATTRIBUTE_RE = /^[\w-:]+$/;
  async function cloneNode(node, context, isRoot = false, addWordToFontFamilies) {
    const { ownerDocument, ownerWindow, fontFamilies, onCloneEachNode } = context;
    if (ownerDocument && isTextNode(node)) {
      if (addWordToFontFamilies && /\S/.test(node.data)) {
        addWordToFontFamilies(node.data);
      }
      return ownerDocument.createTextNode(node.data);
    }
    if (ownerDocument && ownerWindow && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
      const cloned2 = await cloneElement(node, context);
      if (context.isEnable("removeAbnormalAttributes")) {
        const names = cloned2.getAttributeNames();
        for (let len = names.length, i = 0; i < len; i++) {
          const name = names[i];
          if (!NORMAL_ATTRIBUTE_RE.test(name)) {
            cloned2.removeAttribute(name);
          }
        }
      }
      const style = context.currentNodeStyle = copyCssStyles(node, cloned2, isRoot, context);
      if (isRoot)
        applyCssStyleWithOptions(cloned2, context);
      let copyScrollbar = false;
      if (context.isEnable("copyScrollbar")) {
        const overflow = [
          style.get("overflow-x")?.[0],
          style.get("overflow-y")?.[0]
        ];
        copyScrollbar = overflow.includes("scroll") || (overflow.includes("auto") || overflow.includes("overlay")) && (node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth);
      }
      const textTransform = style.get("text-transform")?.[0];
      const families = splitFontFamily(style.get("font-family")?.[0]);
      const addWordToFontFamilies2 = families ? (word) => {
        if (textTransform === "uppercase") {
          word = word.toUpperCase();
        } else if (textTransform === "lowercase") {
          word = word.toLowerCase();
        } else if (textTransform === "capitalize") {
          word = word[0].toUpperCase() + word.substring(1);
        }
        families.forEach((family) => {
          let fontFamily = fontFamilies.get(family);
          if (!fontFamily) {
            fontFamilies.set(family, fontFamily = /* @__PURE__ */ new Set());
          }
          word.split("").forEach((text) => fontFamily.add(text));
        });
      } : void 0;
      copyPseudoClass(
        node,
        cloned2,
        copyScrollbar,
        context,
        addWordToFontFamilies2
      );
      copyInputValue(node, cloned2);
      if (!isVideoElement(node)) {
        await cloneChildNodes(
          node,
          cloned2,
          context,
          addWordToFontFamilies2
        );
      }
      await onCloneEachNode?.(cloned2);
      return cloned2;
    }
    const cloned = node.cloneNode(false);
    await cloneChildNodes(node, cloned, context);
    await onCloneEachNode?.(cloned);
    return cloned;
  }
  function destroyContext(context) {
    context.ownerDocument = void 0;
    context.ownerWindow = void 0;
    context.svgStyleElement = void 0;
    context.svgDefsElement = void 0;
    context.svgStyles.clear();
    context.defaultComputedStyles.clear();
    if (context.sandbox) {
      try {
        context.sandbox.remove();
      } catch (err) {
        context.log.warn("Failed to destroyContext", err);
      }
      context.sandbox = void 0;
    }
    context.workers = [];
    context.fontFamilies.clear();
    context.fontCssTexts.clear();
    context.requests.clear();
    context.tasks = [];
    context.shadowRoots = [];
  }
  function baseFetch(options) {
    const { url, timeout, responseType, ...requestInit } = options;
    const controller = new AbortController();
    const timer = timeout ? setTimeout(() => controller.abort(), timeout) : void 0;
    return fetch(url, { signal: controller.signal, ...requestInit }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed fetch, not 2xx response", { cause: response });
      }
      switch (responseType) {
        case "arrayBuffer":
          return response.arrayBuffer();
        case "dataUrl":
          return response.blob().then(blobToDataUrl);
        case "text":
        default:
          return response.text();
      }
    }).finally(() => clearTimeout(timer));
  }
  function contextFetch(context, options) {
    const { url: rawUrl, requestType = "text", responseType = "text", imageDom } = options;
    let url = rawUrl;
    const {
      timeout,
      acceptOfImage,
      requests,
      fetchFn,
      fetch: {
        requestInit,
        bypassingCache,
        placeholderImage
      },
      font,
      workers,
      fontFamilies
    } = context;
    if (requestType === "image" && (IN_SAFARI || IN_FIREFOX)) {
      context.drawImageCount++;
    }
    let request = requests.get(rawUrl);
    if (!request) {
      if (bypassingCache) {
        if (bypassingCache instanceof RegExp && bypassingCache.test(url)) {
          url += (/\?/.test(url) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
        }
      }
      const canFontMinify = requestType.startsWith("font") && font && font.minify;
      const fontTexts = /* @__PURE__ */ new Set();
      if (canFontMinify) {
        const families = requestType.split(";")[1].split(",");
        families.forEach((family) => {
          if (!fontFamilies.has(family))
            return;
          fontFamilies.get(family).forEach((text) => fontTexts.add(text));
        });
      }
      const needFontMinify = canFontMinify && fontTexts.size;
      const baseFetchOptions = {
        url,
        timeout,
        responseType: needFontMinify ? "arrayBuffer" : responseType,
        headers: requestType === "image" ? { accept: acceptOfImage } : void 0,
        ...requestInit
      };
      request = {
        type: requestType,
        resolve: void 0,
        reject: void 0,
        response: null
      };
      request.response = (async () => {
        if (fetchFn && requestType === "image") {
          const result = await fetchFn(rawUrl);
          if (result)
            return result;
        }
        if (!IN_SAFARI && rawUrl.startsWith("http") && workers.length) {
          return new Promise((resolve, reject) => {
            const worker = workers[requests.size & workers.length - 1];
            worker.postMessage({ rawUrl, ...baseFetchOptions });
            request.resolve = resolve;
            request.reject = reject;
          });
        }
        return baseFetch(baseFetchOptions);
      })().catch((error) => {
        requests.delete(rawUrl);
        if (requestType === "image" && placeholderImage) {
          context.log.warn("Failed to fetch image base64, trying to use placeholder image", url);
          return typeof placeholderImage === "string" ? placeholderImage : placeholderImage(imageDom);
        }
        throw error;
      });
      requests.set(rawUrl, request);
    }
    return request.response;
  }
  async function replaceCssUrlToDataUrl(cssText, baseUrl, context, isImage) {
    if (!hasCssUrl(cssText))
      return cssText;
    for (const [rawUrl, url] of parseCssUrls(cssText, baseUrl)) {
      try {
        const dataUrl = await contextFetch(
          context,
          {
            url,
            requestType: isImage ? "image" : "text",
            responseType: "dataUrl"
          }
        );
        cssText = cssText.replace(toRE(rawUrl), `$1${dataUrl}$3`);
      } catch (error) {
        context.log.warn("Failed to fetch css data url", rawUrl, error);
      }
    }
    return cssText;
  }
  function hasCssUrl(cssText) {
    return /url\((['"]?)([^'"]+?)\1\)/.test(cssText);
  }
  var URL_RE = /url\((['"]?)([^'"]+?)\1\)/g;
  function parseCssUrls(cssText, baseUrl) {
    const result = [];
    cssText.replace(URL_RE, (raw, quotation, url) => {
      result.push([url, resolveUrl(url, baseUrl)]);
      return raw;
    });
    return result.filter(([url]) => !isDataUrl(url));
  }
  function toRE(url) {
    const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
  }
  var properties = [
    "background-image",
    "border-image-source",
    "-webkit-border-image",
    "-webkit-mask-image",
    "list-style-image"
  ];
  function embedCssStyleImage(style, context) {
    return properties.map((property) => {
      const value = style.getPropertyValue(property);
      if (!value || value === "none") {
        return null;
      }
      if (IN_SAFARI || IN_FIREFOX) {
        context.drawImageCount++;
      }
      return replaceCssUrlToDataUrl(value, null, context, true).then((newValue) => {
        if (!newValue || value === newValue)
          return;
        style.setProperty(
          property,
          newValue,
          style.getPropertyPriority(property)
        );
      });
    }).filter(Boolean);
  }
  function embedImageElement(cloned, context) {
    if (isImageElement(cloned)) {
      const originalSrc = cloned.currentSrc || cloned.src;
      if (!isDataUrl(originalSrc)) {
        return [
          contextFetch(context, {
            url: originalSrc,
            imageDom: cloned,
            requestType: "image",
            responseType: "dataUrl"
          }).then((url) => {
            if (!url)
              return;
            cloned.srcset = "";
            cloned.dataset.originalSrc = originalSrc;
            cloned.src = url || "";
          })
        ];
      }
      if (IN_SAFARI || IN_FIREFOX) {
        context.drawImageCount++;
      }
    } else if (isSVGElementNode(cloned) && !isDataUrl(cloned.href.baseVal)) {
      const originalSrc = cloned.href.baseVal;
      return [
        contextFetch(context, {
          url: originalSrc,
          imageDom: cloned,
          requestType: "image",
          responseType: "dataUrl"
        }).then((url) => {
          if (!url)
            return;
          cloned.dataset.originalSrc = originalSrc;
          cloned.href.baseVal = url || "";
        })
      ];
    }
    return [];
  }
  function embedSvgUse(cloned, context) {
    const { ownerDocument, svgDefsElement } = context;
    const href = cloned.getAttribute("href") ?? cloned.getAttribute("xlink:href");
    if (!href)
      return [];
    const [svgUrl, id] = href.split("#");
    if (id) {
      const query = `#${id}`;
      const definition = context.shadowRoots.reduce(
        (res, root) => {
          return res ?? root.querySelector(`svg ${query}`);
        },
        ownerDocument?.querySelector(`svg ${query}`)
      );
      if (svgUrl) {
        cloned.setAttribute("href", query);
      }
      if (svgDefsElement?.querySelector(query))
        return [];
      if (definition) {
        svgDefsElement?.appendChild(definition.cloneNode(true));
        return [];
      } else if (svgUrl) {
        return [
          contextFetch(context, {
            url: svgUrl,
            responseType: "text"
          }).then((svgData) => {
            svgDefsElement?.insertAdjacentHTML("beforeend", svgData);
          })
        ];
      }
    }
    return [];
  }
  function embedNode(cloned, context) {
    const { tasks } = context;
    if (isElementNode(cloned)) {
      if (isImageElement(cloned) || isSVGImageElementNode(cloned)) {
        tasks.push(...embedImageElement(cloned, context));
      }
      if (isSVGUseElementNode(cloned)) {
        tasks.push(...embedSvgUse(cloned, context));
      }
    }
    if (isHTMLElementNode(cloned)) {
      tasks.push(...embedCssStyleImage(cloned.style, context));
    }
    cloned.childNodes.forEach((child) => {
      embedNode(child, context);
    });
  }
  async function embedWebFont(clone, context) {
    const {
      ownerDocument,
      svgStyleElement,
      fontFamilies,
      fontCssTexts,
      tasks,
      font
    } = context;
    if (!ownerDocument || !svgStyleElement || !fontFamilies.size) {
      return;
    }
    if (font && font.cssText) {
      const cssText = filterPreferredFormat(font.cssText, context);
      svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText}
`));
    } else {
      const styleSheets = Array.from(ownerDocument.styleSheets).filter((styleSheet) => {
        try {
          return "cssRules" in styleSheet && Boolean(styleSheet.cssRules.length);
        } catch (error) {
          context.log.warn(`Error while reading CSS rules from ${styleSheet.href}`, error);
          return false;
        }
      });
      const tempDoc = ownerDocument.implementation.createHTMLDocument("");
      const tempStyleEl = tempDoc.createElement("style");
      tempDoc.head.appendChild(tempStyleEl);
      const tempStyleSheet = tempStyleEl.sheet;
      await Promise.all(
        styleSheets.flatMap((styleSheet) => {
          return Array.from(styleSheet.cssRules).map(async (cssRule) => {
            if (isCSSImportRule(cssRule)) {
              const baseUrl = cssRule.href;
              let cssText = "";
              try {
                cssText = await contextFetch(context, {
                  url: baseUrl,
                  requestType: "text",
                  responseType: "text"
                });
              } catch (error) {
                context.log.warn(`Error fetch remote css import from ${baseUrl}`, error);
              }
              const replacedCssText = cssText.replace(
                URL_RE,
                (raw, quotation, url) => raw.replace(url, resolveUrl(url, baseUrl))
              );
              for (const rule of parseCss(replacedCssText)) {
                try {
                  tempStyleSheet.insertRule(rule, tempStyleSheet.cssRules.length);
                } catch (error) {
                  context.log.warn("Error inserting rule from remote css import", { rule, error });
                }
              }
            }
          });
        })
      );
      if (tempStyleSheet.cssRules.length)
        styleSheets.push(tempStyleSheet);
      const cssRules = [];
      styleSheets.forEach((sheet) => {
        unwrapCssLayers(sheet.cssRules, cssRules);
      });
      cssRules.filter((cssRule) => isCssFontFaceRule(cssRule) && hasCssUrl(cssRule.style.getPropertyValue("src")) && splitFontFamily(cssRule.style.getPropertyValue("font-family"))?.some((val) => fontFamilies.has(val))).forEach((value) => {
        const rule = value;
        const cssText = fontCssTexts.get(rule.cssText);
        if (cssText) {
          svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText}
`));
        } else {
          tasks.push(
            replaceCssUrlToDataUrl(
              rule.cssText,
              rule.parentStyleSheet ? rule.parentStyleSheet.href : null,
              context
            ).then((cssText2) => {
              cssText2 = filterPreferredFormat(cssText2, context);
              fontCssTexts.set(rule.cssText, cssText2);
              svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText2}
`));
            })
          );
        }
      });
    }
  }
  var COMMENTS_RE = /(\/\*[\s\S]*?\*\/)/g;
  var KEYFRAMES_RE = /((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;
  function parseCss(source) {
    if (source == null)
      return [];
    const result = [];
    let cssText = source.replace(COMMENTS_RE, "");
    while (true) {
      const matches = KEYFRAMES_RE.exec(cssText);
      if (!matches)
        break;
      result.push(matches[0]);
    }
    cssText = cssText.replace(KEYFRAMES_RE, "");
    const IMPORT_RE = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
    const UNIFIED_RE = new RegExp(
      // eslint-disable-next-line
      "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",
      "gi"
    );
    while (true) {
      let matches = IMPORT_RE.exec(cssText);
      if (!matches) {
        matches = UNIFIED_RE.exec(cssText);
        if (!matches) {
          break;
        } else {
          IMPORT_RE.lastIndex = UNIFIED_RE.lastIndex;
        }
      } else {
        UNIFIED_RE.lastIndex = IMPORT_RE.lastIndex;
      }
      result.push(matches[0]);
    }
    return result;
  }
  var URL_WITH_FORMAT_RE = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
  var FONT_SRC_RE = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
  function filterPreferredFormat(str, context) {
    const { font } = context;
    const preferredFormat = font ? font?.preferredFormat : void 0;
    return preferredFormat ? str.replace(FONT_SRC_RE, (match) => {
      while (true) {
        const [src, , format] = URL_WITH_FORMAT_RE.exec(match) || [];
        if (!format)
          return "";
        if (format === preferredFormat)
          return `src: ${src};`;
      }
    }) : str;
  }
  function unwrapCssLayers(rules, out = []) {
    for (const rule of Array.from(rules)) {
      if (isLayerBlockRule(rule)) {
        out.push(...unwrapCssLayers(rule.cssRules));
      } else if ("cssRules" in rule) {
        unwrapCssLayers(rule.cssRules, out);
      } else {
        out.push(rule);
      }
    }
    return out;
  }
  var SVG_EXTERNAL_RESOURCE_REGEX = /\bx?link:?href\s*=\s*["'](?!data:)[^"']+["']/i;
  function svgHasExternalResources(svg) {
    return SVG_EXTERNAL_RESOURCE_REGEX.test(svg.innerHTML);
  }
  async function domToForeignObjectSvg(node, options) {
    const context = await orCreateContext(node, options);
    if (isElementNode(context.node) && isSVGElementNode(context.node) && !svgHasExternalResources(context.node))
      return context.node;
    const {
      ownerDocument,
      log,
      tasks,
      svgStyleElement,
      svgDefsElement,
      svgStyles,
      font,
      progress,
      autoDestruct,
      onCloneNode,
      onEmbedNode,
      onCreateForeignObjectSvg
    } = context;
    log.time("clone node");
    const clone = await cloneNode(context.node, context, true);
    if (svgStyleElement && ownerDocument) {
      let allCssText = "";
      svgStyles.forEach((klasses, cssText) => {
        allCssText += `${klasses.join(",\n")} {
  ${cssText}
}
`;
      });
      svgStyleElement.appendChild(ownerDocument.createTextNode(allCssText));
    }
    log.timeEnd("clone node");
    await onCloneNode?.(clone);
    if (font !== false && isElementNode(clone)) {
      log.time("embed web font");
      await embedWebFont(clone, context);
      log.timeEnd("embed web font");
    }
    log.time("embed node");
    embedNode(clone, context);
    const count = tasks.length;
    let current = 0;
    const runTask = async () => {
      while (true) {
        const task = tasks.pop();
        if (!task)
          break;
        try {
          await task;
        } catch (error) {
          context.log.warn("Failed to run task", error);
        }
        progress?.(++current, count);
      }
    };
    progress?.(current, count);
    await Promise.all([...Array.from({ length: 4 })].map(runTask));
    log.timeEnd("embed node");
    await onEmbedNode?.(clone);
    const svg = createForeignObjectSvg(clone, context);
    svgDefsElement && svg.insertBefore(svgDefsElement, svg.children[0]);
    svgStyleElement && svg.insertBefore(svgStyleElement, svg.children[0]);
    autoDestruct && destroyContext(context);
    await onCreateForeignObjectSvg?.(svg);
    return svg;
  }
  function createForeignObjectSvg(clone, context) {
    const { width, height } = context;
    const svg = createSvg(width, height, clone.ownerDocument);
    const foreignObject = svg.ownerDocument.createElementNS(svg.namespaceURI, "foreignObject");
    foreignObject.setAttributeNS(null, "x", "0%");
    foreignObject.setAttributeNS(null, "y", "0%");
    foreignObject.setAttributeNS(null, "width", "100%");
    foreignObject.setAttributeNS(null, "height", "100%");
    foreignObject.append(clone);
    svg.appendChild(foreignObject);
    return svg;
  }
  async function domToCanvas(node, options) {
    const context = await orCreateContext(node, options);
    const svg = await domToForeignObjectSvg(context);
    const dataUrl = svgToDataUrl(svg, context.isEnable("removeControlCharacter"));
    if (!context.autoDestruct) {
      context.svgStyleElement = createStyleElement(context.ownerDocument);
      context.svgDefsElement = context.ownerDocument?.createElementNS(XMLNS, "defs");
      context.svgStyles.clear();
    }
    const image = createImage(dataUrl, svg.ownerDocument);
    return await imageToCanvas(image, context);
  }
  async function domToDataUrl(node, options) {
    const context = await orCreateContext(node, options);
    const { log, quality, type, dpi } = context;
    const canvas = await domToCanvas(context);
    log.time("canvas to data url");
    let dataUrl = canvas.toDataURL(type, quality);
    if (["image/png", "image/jpeg"].includes(type) && dpi && SUPPORT_ATOB && SUPPORT_BTOA) {
      const [format, body] = dataUrl.split(",");
      let headerLength = 0;
      let overwritepHYs = false;
      if (type === "image/png") {
        const b64Index = detectPhysChunkFromDataUrl(body);
        if (b64Index >= 0) {
          headerLength = Math.ceil((b64Index + 28) / 3) * 4;
          overwritepHYs = true;
        } else {
          headerLength = 33 / 3 * 4;
        }
      } else if (type === "image/jpeg") {
        headerLength = 18 / 3 * 4;
      }
      const stringHeader = body.substring(0, headerLength);
      const restOfData = body.substring(headerLength);
      const headerBytes = window.atob(stringHeader);
      const uint8Array = new Uint8Array(headerBytes.length);
      for (let i = 0; i < uint8Array.length; i++) {
        uint8Array[i] = headerBytes.charCodeAt(i);
      }
      const finalArray = type === "image/png" ? changePngDpi(uint8Array, dpi, overwritepHYs) : changeJpegDpi(uint8Array, dpi);
      const base64Header = window.btoa(String.fromCharCode(...finalArray));
      dataUrl = [format, ",", base64Header, restOfData].join("");
    }
    log.timeEnd("canvas to data url");
    return dataUrl;
  }
  async function domToJpeg(node, options) {
    return domToDataUrl(
      await orCreateContext(node, { ...options, type: "image/jpeg" })
    );
  }

  // src/screenshot.ts
  var screenshotCache = /* @__PURE__ */ new Map();
  var MAX_WIDTH = 120;
  var MAX_HEIGHT = 80;
  function isPointInBounds(x, y, bounds) {
    return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
  }
  function findCachedScreenshot(page, x, y) {
    const pageCache = screenshotCache.get(page);
    if (!pageCache) return null;
    for (const item of pageCache) {
      if (isPointInBounds(x, y, item.bounds)) return item;
    }
    return null;
  }
  function generateDedupeKey(element) {
    const tag = element.tagName.toLowerCase();
    const className = (element.className || "").split(" ").filter((c) => c.length > 0 && !c.match(/^(flex|inline|items|justify|gap|px|py|rounded|border|bg|text|font|w|h|overflow|cursor)/)).slice(0, 3).join(".");
    const text = element.textContent?.trim().slice(0, 20) || "";
    return `${tag}.${className}.${text}`;
  }
  async function captureElement(element, maxWidth = MAX_WIDTH, maxHeight = MAX_HEIGHT) {
    try {
      const rect = element.getBoundingClientRect();
      const targetWidth = Math.min(rect.width, maxWidth);
      const targetHeight = Math.min(rect.height, maxHeight);
      const dataUrl = await domToJpeg(element, {
        scale: 1,
        width: targetWidth,
        height: targetHeight,
        backgroundColor: "#ffffff",
        quality: 0.7
      });
      return dataUrl.replace(/^data:image\/jpeg;base64,/, "");
    } catch (error) {
      console.error("[Vdata] \u5143\u7D20\u622A\u56FE\u5931\u8D25:", error);
      return "";
    }
  }
  async function getElementScreenshot(element, page, x, y) {
    const cached = findCachedScreenshot(page, x, y);
    if (cached) return { screenshot: cached.screenshot, dedupeKey: cached.dedupeKey };
    const screenshot = await captureElement(element);
    if (!screenshot) return null;
    const rect = element.getBoundingClientRect();
    const bounds = { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    const dedupeKey = generateDedupeKey(element);
    const pageCache = screenshotCache.get(page) || [];
    pageCache.push({ screenshot, bounds, dedupeKey });
    screenshotCache.set(page, pageCache);
    return { screenshot, dedupeKey };
  }
  function clearScreenshotCache() {
    screenshotCache.clear();
  }
  var PAGE_SCREENSHOT_KEY = "__vdata_page_screenshots__";
  function getCapturedPages() {
    try {
      const raw = localStorage.getItem(PAGE_SCREENSHOT_KEY);
      return raw ? new Set(JSON.parse(raw)) : /* @__PURE__ */ new Set();
    } catch {
      return /* @__PURE__ */ new Set();
    }
  }
  function markPageCaptured(page) {
    try {
      const pages = getCapturedPages();
      pages.add(page);
      localStorage.setItem(PAGE_SCREENSHOT_KEY, JSON.stringify([...pages]));
    } catch {
    }
  }
  async function capturePageScreenshot(serverUrl, appId, debug) {
    const page = window.location.pathname + window.location.hash;
    const captured = getCapturedPages();
    if (captured.has(page)) {
      if (debug) console.log("[Vdata] \u6574\u9875\u622A\u56FE\u5DF2\u5B58\u5728\uFF0C\u8DF3\u8FC7:", page);
      return;
    }
    try {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let fullPageHeight = document.documentElement.scrollHeight;
      const MAX_SCREENSHOT_HEIGHT = 3e3;
      if (fullPageHeight > MAX_SCREENSHOT_HEIGHT) {
        fullPageHeight = MAX_SCREENSHOT_HEIGHT;
      }
      if (debug) console.log("[Vdata] \u5F00\u59CB\u6574\u9875\u622A\u56FE:", page, `${viewportWidth}x${fullPageHeight}`);
      const safeFetchFn = async (url2) => {
        try {
          const response = await fetch(url2, { mode: "cors" });
          if (!response.ok) return void 0;
          return await response.text();
        } catch {
          return void 0;
        }
      };
      const dataUrl = await domToJpeg(document.body, {
        scale: 1,
        width: viewportWidth,
        height: fullPageHeight,
        quality: 0.6,
        backgroundColor: "#ffffff",
        fetchFn: safeFetchFn
      });
      const screenshot = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
      if (!screenshot) {
        if (debug) console.warn("[Vdata] \u6574\u9875\u622A\u56FE\u7ED3\u679C\u4E3A\u7A7A");
        return;
      }
      const payload = {
        appId,
        page,
        screenshot,
        viewportWidth,
        viewportHeight,
        fullPageHeight
      };
      const url = serverUrl.replace(/\/track$/, "/page-screenshot");
      const data = JSON.stringify(payload);
      try {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
          keepalive: true
        });
        markPageCaptured(page);
        if (debug) console.log("[Vdata] \u6574\u9875\u622A\u56FE\u5B8C\u6210:", page, `${viewportWidth}x${fullPageHeight}`);
      } catch (fetchError) {
        if (navigator.sendBeacon) {
          const blob = new Blob([data], { type: "application/json" });
          const sent = navigator.sendBeacon(url, blob);
          if (sent) {
            markPageCaptured(page);
            if (debug) console.log("[Vdata] \u6574\u9875\u622A\u56FE\u5B8C\u6210 (sendBeacon):", page);
            return;
          }
        }
        if (debug) console.error("[Vdata] \u6574\u9875\u622A\u56FE\u4E0A\u62A5\u5931\u8D25:", fetchError);
      }
    } catch (error) {
      if (debug) console.error("[Vdata] \u6574\u9875\u622A\u56FE\u5931\u8D25:", error);
    }
  }

  // src/tracker.ts
  var Tracker = class {
    constructor(config) {
      this.collector = null;
      this.initDeferred = false;
      this.deferredInitTimer = null;
      this.pageScreenshotTimer = null;
      if (!config.appId) {
        throw new Error("[Vdata] appId is required");
      }
      if (!config.serverUrl) {
        throw new Error("[Vdata] serverUrl is required");
      }
      const sampleRate = config.sampleRate ?? 1;
      if (sampleRate < 0 || sampleRate > 1) {
        console.warn("[Vdata] sampleRate should be between 0 and 1");
      }
      this.state = {
        config: {
          sampleRate: 1,
          batchInterval: 5e3,
          batchSize: 10,
          debug: false,
          deferInit: false,
          // 默认不延迟
          ...config
        },
        userId: getUserId(config),
        eventQueue: [],
        isInitialized: false
      };
      this.reporter = new Reporter(this.state);
      if (config.deferInit) {
        this.initDeferred = true;
        this.scheduleDeferredInit();
      } else {
        this.initCollector();
      }
      this.schedulePageScreenshot();
      if (this.state.config.debug) {
        console.log("[Vdata] Tracker \u521B\u5EFA\u5B8C\u6210", {
          appId: this.state.config.appId,
          userId: this.state.userId,
          deferInit: config.deferInit || false
        });
      }
    }
    /**
     * 调度整页截图（延迟执行，不阻塞页面）
     */
    schedulePageScreenshot() {
      const scheduleCapture = () => {
        capturePageScreenshot(
          this.state.config.serverUrl,
          this.state.config.appId,
          this.state.config.debug
        );
      };
      if ("requestIdleCallback" in window) {
        requestIdleCallback(scheduleCapture, { timeout: 1e4 });
      } else {
        this.pageScreenshotTimer = setTimeout(scheduleCapture, 5e3);
      }
    }
    /**
     * 延迟初始化采集器
     */
    scheduleDeferredInit() {
      const onFirstInteraction = () => {
        if (this.initDeferred && !this.state.isInitialized) {
          this.initCollector();
          this.state.isInitialized = true;
          if (this.state.config.debug) {
            console.log("[Vdata] \u5EF6\u8FDF\u521D\u59CB\u5316\u5B8C\u6210 - \u7528\u6237\u9996\u6B21\u4EA4\u4E92\u89E6\u53D1");
          }
        }
        document.removeEventListener("click", onFirstInteraction, true);
        document.removeEventListener("keydown", onFirstInteraction, true);
        document.removeEventListener("scroll", onFirstInteraction, true);
        document.removeEventListener("mousemove", onFirstInteraction, true);
      };
      document.addEventListener("click", onFirstInteraction, { capture: true, passive: true, once: true });
      document.addEventListener("keydown", onFirstInteraction, { capture: true, passive: true, once: true });
      document.addEventListener("scroll", onFirstInteraction, { capture: true, passive: true, once: true });
      document.addEventListener("mousemove", onFirstInteraction, { capture: true, passive: true, once: true });
      this.deferredInitTimer = window.setTimeout(() => {
        if (this.initDeferred && !this.state.isInitialized) {
          this.initCollector();
          this.state.isInitialized = true;
          if (this.state.config.debug) {
            console.log("[Vdata] \u5EF6\u8FDF\u521D\u59CB\u5316\u5B8C\u6210 - \u5B9A\u65F6\u5668\u515C\u5E95\u89E6\u53D1");
          }
        }
      }, 3e3);
    }
    /**
     * 初始化采集器
     */
    initCollector() {
      if (this.collector) return;
      this.collector = new Collector(
        (event, targetElement) => this.onEventCollected(event, targetElement),
        this.state.config.filter
      );
      if (this.deferredInitTimer) {
        clearTimeout(this.deferredInitTimer);
        this.deferredInitTimer = null;
      }
    }
    /**
     * 事件采集回调（异步处理截图）
     */
    async onEventCollected(event, targetElement) {
      if (!shouldSample(this.state.config.sampleRate)) {
        return;
      }
      if (targetElement) {
        try {
          const screenshotData = await getElementScreenshot(
            targetElement,
            event.page,
            event.x,
            event.y
          );
          if (screenshotData) {
            event.screenshot = screenshotData.screenshot;
            event.screenshotDedupeKey = screenshotData.dedupeKey;
          }
        } catch (error) {
          if (this.state.config.debug) {
            console.error("[Vdata] \u622A\u56FE\u5931\u8D25:", error);
          }
        }
      }
      this.reporter.addEvent(event);
    }
    /**
     * 手动上报（立即发送队列中的事件）
     */
    flush() {
      this.reporter.flush();
    }
    /**
     * 手动追踪自定义事件
     */
    track(event) {
      const fullEvent = {
        timestamp: Date.now(),
        x: 0,
        y: 0,
        page: window.location.pathname,
        target: {
          tag: "custom"
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        scroll: {
          x: window.scrollX,
          y: window.scrollY
        },
        ...event
      };
      this.onEventCollected(fullEvent);
    }
    /**
     * 设置用户 ID
     */
    setUserId(userId) {
      this.state.userId = userId;
    }
    /**
     * 设置用户角色
     */
    setUserRole(role) {
      this.state.config.userRole = role;
    }
    /**
     * 销毁实例
     */
    destroy() {
      this.collector?.destroy();
      this.reporter.destroy();
      if (this.deferredInitTimer) {
        clearTimeout(this.deferredInitTimer);
        this.deferredInitTimer = null;
      }
      if (this.pageScreenshotTimer) {
        clearTimeout(this.pageScreenshotTimer);
        this.pageScreenshotTimer = null;
      }
      this.state.isInitialized = false;
    }
  };
  var instance = null;
  function init(config) {
    if (instance) {
      console.warn("[Vdata] \u5DF2\u7ECF\u521D\u59CB\u5316\uFF0C\u8BF7\u52FF\u91CD\u590D\u8C03\u7528");
      return instance;
    }
    instance = new Tracker(config);
    return instance;
  }
  function getInstance() {
    return instance;
  }
  function destroy() {
    if (instance) {
      instance.destroy();
      instance = null;
    }
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=index.umd.js.map
