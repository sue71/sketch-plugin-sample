@import "../../Vendor/MochaJSDelegate.js";

const didFinishLoadForFrame = "webView:didFinishLoadForFrame:";
const didChangeLocation = "webView:didChangeLocationWithinPageForFrame:";

class WebViewDelegate {

  constructor(delegate) {
    this.delegate = delegate;
    this.setup();
  }

  setup() {

    log("WebViewDelegate#setup");

    /// Use MochaJSDelegate for handling delegate from WebView
    this.mochaJSDelegate = new MochaJSDelegate({

      [didFinishLoadForFrame]: (webView, webFrame) => {
        log("WebViewDelegate#didFinishLoadForFrame");
        if (this.delegate.didFinishLaunch) {
          this.delegate.didFinishLaunch(webView, webFrame);
        }
      },

      [didChangeLocation]: (webView, webFrame) => {
        log("WebViewDelegate#didChangeLocation");
        if (this.delegate.didChangeLocation) {
          this.delegate.didChangeLocation(webView, webFrame);
        }
      }
    });

  }

  getClassInstance() {
    return this.mochaJSDelegate.getClassInstance();
  }

}
