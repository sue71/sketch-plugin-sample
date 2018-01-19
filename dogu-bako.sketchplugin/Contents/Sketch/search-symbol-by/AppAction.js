@import "../shared/utils/toJSArray.js";

class AppAction {

  constructor(context) {
    this.context = context;
  }

  searchPage(layer) {
    let target = layer;
    while (target.class() != MSPage) {
      target = target.parentGroup();
    }
    return target;
  }

  searchLayer(predicate) {

    const doc = this.context.document;

    let result = NSArray.array();
    let list = doc.pages().objectEnumerator();
    let page;

    while (page = list.nextObject()) {
      let items = page.children();
      result = result.arrayByAddingObjectsFromArray(
        items.filteredArrayUsingPredicate(predicate)
      );
    }
    return result;

  }

  searchLayerObject(predicate) {
    return toJSArray(this.searchLayer(predicate)).map( v => this.toObject(v) );
  }

  getColorCode(layer) {

    log(layer.style().fills());
    switch (layer.class()) {

      case MSTextLayer:

        return layer.textColor();
        break;

      default:

        let fill = layer.style().fills().first;
        if (fill && fill.isEnabled()) {
          return fill.color();
        }

    }

    return null;

  }

  toObject(layer) {
    const color = this.getColorCode(layer);
    let object = {
      objectID: layer.objectID() + "",
      name: layer.name() + "",
      class: layer.class() + "",
      value: layer.stringValue && layer.stringValue() + "" || "",
      color: color && color.NSColorWithColorSpace(nil).hexValue()
    };

    if (layer.parentGroup()) {
      object.parent = this.toObject(layer.parentGroup())
    }

    return object;
  }

}
