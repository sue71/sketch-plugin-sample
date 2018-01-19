/// Create UIWebView instance
function createWebView(path, frame, delegate) {

  const webView = WebView.alloc().initWithFrame(frame);

  webView.setFrameLoadDelegate_(delegate.getClassInstance());
  webView.setMainFrameURL_(path);

  return webView;

}
