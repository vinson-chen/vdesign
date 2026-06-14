import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app"

// 初始化 Vdata 埋点 SDK
if (typeof window !== 'undefined') {
  const script = document.createElement('script')
  script.src = '/vdesign/sdk/index.umd.js'
  script.onload = () => {
    if (typeof (window as any).VdataTracker !== 'undefined') {
      (window as any).VdataTracker.init({
        appId: 'vdesign-demo',
        serverUrl: 'http://localhost:3001/api/track',
        sampleRate: 1,
        batchInterval: 3000,
        batchSize: 5,
        debug: true,
        deferInit: true,  // 延迟初始化，避免阻塞页面渲染
      })
      console.log('✅ Vdata SDK 已初始化 - appId: vdesign-demo')
    }
  }
  document.head.appendChild(script)
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
