function searchLayer(context, source, predicate = undefined) {

    let pages = context.document.pages();
    let result = NSArray.array();
    let list = pages.objectEnumerator();
    let page;

    if (source) {
      let items = source.children()
      result = result.arrayByAddingObjectsFromArray(
        predicate ? items.filteredArrayUsingPredicate(predicate) : items
      );
      return result;
    }

    while (page = list.nextObject()) {
      let items = page.children();
      result = result.arrayByAddingObjectsFromArray(
        predicate ? items.filteredArrayUsingPredicate(predicate) : items
      );
    }

    return result;

}
