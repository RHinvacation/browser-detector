import { useState, useEffect } from 'react';
import { getDetectionResult } from './utils/detector';
import clipboardy from 'clipboardy';

function App() {
  const [result, setResult] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // 初始化检测
  useEffect(() => {
    setResult(getDetectionResult());
  }, []);

  // 复制结果到剪贴板
  const copyToClipboard = () => {
    const text = JSON.stringify(result, null, 2);
    clipboardy.write(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  if (!result) return <div className="flex justify-center items-center h-screen">检测中...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 标题区域 */}
      <header className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">浏览器内核检测工具</h1>
        <p className="text-secondary">适配手机、平板、电脑等所有设备 | 检测内核、设备、特性支持</p>
      </header>

      {/* 核心检测结果卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="card">
          <h2 className="text-lg font-semibold mb-3">浏览器信息</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-secondary">浏览器：</span>
              <span>{result.browser}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-secondary">内核：</span>
              <span>{result.engine}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-secondary">操作系统：</span>
              <span>{result.os}</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-3">设备信息</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-secondary">设备类型：</span>
              <span>{result.device}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-secondary">屏幕分辨率：</span>
              <span>{result.screen}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-secondary">{result.pixelRatio}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 特性支持检测 */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-3">核心特性支持</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(result.features).map(([key, supported]) => (
            <div key={key} className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${supported ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="capitalize">{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Agent 信息 */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-3">User Agent</h2>
        <p className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded break-all">{result.userAgent}</p>
      </div>

      {/* 复制按钮 */}
      <div className="text-center">
        <button
          onClick={copyToClipboard}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-all"
        >
          {copySuccess ? '复制成功！' : '复制检测结果'}
        </button>
      </div>

      {/* 底部版权信息 */}
      <footer className="text-center mt-12 text-sm text-secondary">
        <p>© {new Date().getFullYear()} 浏览器内核检测工具 | 基于 React + Tailwind CSS 开发</p>
      </footer>
    </div>
  );
}

export default App;