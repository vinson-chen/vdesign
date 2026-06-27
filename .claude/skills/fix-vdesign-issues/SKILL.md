---
name: fix-vdesign-issues
description: 从 Vdata 接收问题并执行修复
user-invocable: true
---

# Vdesign 问题修复 Skill

从共享目录读取 Vdata 上报的问题并执行修复。

## 使用方式

```
/fix-vdesign-issues
```

## 执行流程

1. **读取问题列表**
   - 路径：`/Users/chenhui/Desktop/vinson/.vdata-issues/pending-issues.json`
   - 显示所有 `status: pending` 的问题

2. **逐个处理问题**
   - 分析问题根因
   - 础认是否为 Vdesign 内部问题
   - 执行修复（遵循 Vdesign 开发规范）
   - 运行 `npm run typecheck` 验证

3. **提交到 GitHub**
   - 创建 commit（描述修复内容）
   - Push 到 GitHub 仓库
   - 记录 commit SHA 或 PR 链接

4. **更新问题状态**
   - 修复成功：标记 `status: completed`，填写 `commitSha` 和 `prUrl`
   - 拒绝修复：标记 `status: rejected` 并说明原因
   - 需要更多信息：标记 `status: need_info`

5. **完成后通知**
   - 汇总修复情况
   - 提示用户：「请在 Vdata 中执行 `npm run sync:vdesign` 同步组件，然后验证」

## 状态记录格式

```json
{
  "status": "completed",
  "commitSha": "abc123...",
  "prUrl": "https://github.com/.../pull/...",
  "fixedAt": "ISO时间戳"
}
```

## 参数

此 skill 无参数，自动从共享文件读取问题。