import { UAParser } from 'ua-parser-js';

// 初始化 UA 解析器
const parser = new UAParser(navigator.userAgent);
const result = parser.getResult();

/**
 * 1. 检测浏览器内核
 */
export const getBrowserEngine = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('blink')) return 'Blink（Chrome/Edge/Opera 内核）';
  if (ua.includes('webkit') && !ua.includes('edge')) return 'WebKit（Safari 内核）';
  if (ua.includes('gecko') && !ua.includes('webkit')) return 'Gecko（Firefox 内核）';
  if (ua.includes('trident')) return 'Trident（IE 内核）';
  return '未知内核';
};

/**
 * 2. 检测设备类型（手机/平板/电脑）
 */
export const getDeviceType = () => {
  if (/(mobile|android|iphone|ipod|blackberry|windows phone)/i.test(navigator.userAgent)) {
    return '手机';
  }
  if (/(tablet|ipad|playbook|silk)/i.test(navigator.userAgent)) {
    return '平板';
  }
  return '电脑';
};

/**
 * 3. 检测 HTML5/CSS3 核心特性
 */
export const getFeatureSupport = () => {
  return {
    canvas: !!window.CanvasRenderingContext2D,
    flexbox: !!window.getComputedStyle(document.documentElement).flexWrap,
    webgl: !!window.WebGLRenderingContext,
    localstorage: !!window.localStorage,
    fetch: !!window.fetch,
    es6: typeof Promise !== 'undefined',
  };
};

/**
 * 4. 整合所有检测结果
 */
export const getDetectionResult = () => {
  return {
    browser: `${result.browser.name || '未知浏览器'} v${result.browser.version || '未知版本'}`,
    engine: getBrowserEngine(),
    os: `${result.os.name || '未知系统'} v${result.os.version || '未知版本'}`,
    device: getDeviceType(),
    screen: `${window.screen.width}px × ${window.screen.height}px`,
    pixelRatio: `设备像素比: ${window.devicePixelRatio}`,
    features: getFeatureSupport(),
    userAgent: navigator.userAgent,
  };
};