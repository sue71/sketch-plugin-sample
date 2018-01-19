@import "../shared/WebViewDelegate.js";
@import "../shared/factories/createWebView.js";
@import "../shared/factories/createWindow.js";

@import "AppAction.js";

/**
 * App
 * Controller for sketch plugins
 */
class App {

  get identifier() { return "com.github.sue71.search-symbol-by"; }

  constructor(context, debug) {

    log("App#constructor");

    this.setup(context, debug);

  }

  setup(context, debug) {

    log("App#setup");

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

  /**
   * dispose
   */
  dispose() {
    log("App#dispose");
    this.threads.removeObjectForKey(this.identifier);
    this.window.close();
    COScript.currentCOScript().setShouldKeepAround(false);
  }

  /**
   * Handle select layer
   * @param {*} selectedID
   */
  didSelectLayer(selectedID) {

      const predicate = NSPredicate.predicateWithFormat(
        "objectID == %@",
        selectedID
      );

      const layer = this.action.searchLayer(predicate)[0];
      const page = this.action.searchPage(layer);

      this.context.document.setCurrentPage(page);
      layer.select_byExpandingSelection(true, false);
      this.context.document.currentView().centerRect_(layer.absoluteRect().rect());

  }

  /**
   * Handle request to search layer
   * @param {*} criteria
   */
  didRequestSearchLayer(criteria) {

      const text = criteria.text;
      const color = criteria.color;
      const type = criteria.type
      const predicate = NSPredicate.predicateWithFormat(
        "name CONTAINS [c] %@ ||" +
        "stringValue CONTAINS [c] %@",
        text, text
      );

      const layers = this.action.searchLayerObject(predicate);
      const payload = "didReceiveSymbols::" + layers.map( v => JSON.stringify(v) ).join("___");

      log(payload);

      this.webviewScript.evaluateWebScript(
        `window.App.handleSketchEvent('${payload}')`
      );


  }

  /**
   * Handle changing location path for WebView
   */
  didChangeLocation(webView, webFrame) {

    log("App#didChangeLocation");

    /// Get hash from window
    const locationHash = this.webviewScript.evaluateWebScript("window.location.hash");
    log(locationHash);

    /// Select layer
    if (locationHash.indexOf("@selectedID=") > -1) {

      const selectedID = locationHash.slice("#@selectedID=".length).trim();
      this.didSelectLayer(selectedID);

      return;

    }

    /// Change query
    if (locationHash.indexOf("@query=") > -1) {

      const criteria= JSON.parse(
        locationHash.slice("#@query=".length).trim()
      );
      this.didRequestSearchLayer(criteria);

      return;

    }

  }

}
