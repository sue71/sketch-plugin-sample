@import "../shared/utils/layer.js";

/**
 * App
 * Controller for sketch plugins
 */
class App {

  get identifier() { return "com.github.sue71.assets"; }

  constructor(context, debug) {
    this.setup(context, debug);
  }

  setup(context) {

    this.context = context;

    // Skip if application has already launched
    const identifier = this.identifier;
    this.threads = NSThread.mainThread().threadDictionary();
    if (this.threads[identifier]) {
      return;
    }

    let path;
    if (debug) {
      path = "http://localhost:3000";
    } else {
      path = context.plugin.urlForResourceNamed("index.html").path();
    }

    const delegate = new WebViewDelegate({
      didChangeLocation: this.didChangeLocation.bind(this)
    });

    const frame = NSMakeRect(0, 0, 480, 400);

    // set context
    this.context = context;
    // set action
    this.action = new AppAction(context);
    // set webview
    this.webview = createWebView(path, frame, delegate);
    // script runner
    this.webviewScript = this.webview.windowScriptObject();
    // set native window
    this.window = createWindow(this.webview, frame, {
      onClose: this.dispose.bind(this)
    });

    // Set thread
    this.threads[identifier] = this.window;
    // Long run script
    COScript.currentCOScript().setShouldKeepAround_(true);


  }

}
