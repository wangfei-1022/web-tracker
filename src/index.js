import jsTracker from './jsTracker/index'
window.jsTracker = jsTracker
jsTracker.injectJsError();
jsTracker.injectXHR();
jsTracker.blankScreen();
jsTracker.timing();
jsTracker.longTask();
jsTracker.pv();