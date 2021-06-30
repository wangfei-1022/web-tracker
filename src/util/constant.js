
export const LOG_TYPE_ERROR = 'error' // 错误日志
export const LOG_TYPE_PRODUCT = 'product' // 产品指标
export const LOG_TYPE_INFO = 'info' // 尚未使用
export const LOG_TYPE_PERFORMANCE = 'perf' // 性能指标

// 定义JS_TRACKER错误类型码
export const JS_TRACKER_ERROR_CONSTANT_MAP = {
  1: 'ERROR_RUNTIME',
  2: 'ERROR_SCRIPT',
  3: 'ERROR_STYLE',
  4: 'ERROR_IMAGE',
  5: 'ERROR_AUDIO',
  6: 'ERROR_VIDEO',
  7: 'ERROR_CONSOLE',
  8: 'ERROR_TRY_CATCH'
}

export const JS_TRACKER_ERROR_DISPLAY_MAP = {
  1: 'JS_RUNTIME_ERROR',
  2: 'SCRIPT_LOAD_ERROR',
  3: 'CSS_LOAD_ERROR',
  4: 'IMAGE_LOAD_ERROR',
  5: 'AUDIO_LOAD_ERROR',
  6: 'VIDEO_LOAD_ERROR',
  7: 'CONSOLE_ERROR',
  8: 'TRY_CATCH_ERROR'
}