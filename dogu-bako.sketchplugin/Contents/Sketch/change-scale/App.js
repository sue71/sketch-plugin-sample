@import "../shared/utils/layer.js";

/**
 * App
 * Controller for sketch plugins
 */
class App {

  get identifier() { return "com.github.sue71.change-scale"; }

  constructor(context) {
    this.setup(context);
  }

  resize(context) {

    const document = context.document
    const pages = document.pages()
    const currentPage = document.currentPage()
    const artboards = currentPage.artboards()
    const currentArtboard = currentPage.currentArtboard()

    if (currentArtboard == null) {
      document.showMessage("Please choose an artboard as templet");
    } else {
      document.showMessage("loading...");
    }

    /// Get all layers
    const layers = currentArtboard.layers()

    /// TODO: enable to select size
    const toWidth = currentArtboard.frame().width() / 2
    const toHeight = currentArtboard.frame().height() / 2

    const ratioWidth = currentArtboard.frame().width() / toWidth;
    const ratioHeight = currentArtboard.frame().height() / toHeight;

    copyLayers()

    /// Resize property
    function resizeProperty(targetLayer, ratioWidth, ratioHeight) {

      const frame = targetLayer.frame();

      let ratio, newX, newY, newW, newH;
      if (ratioWidth > ratioHeight) {
        newX = frame.x() / ratioWidth
        newY = frame.y() / ratioWidth + (toHeight - currentArtboard.frame().height() / ratioWidth) / 2
        newW = frame.width() / ratioWidth
        newH = frame.height() / ratioWidth
        ratio = ratioWidth
      } else {
        newX = frame.x() / ratioHeight + (toWidth - currentArtboard.frame().width() / ratioHeight) / 2
        newY = frame.y() / ratioHeight
        newW = frame.width() / ratioHeight
        newH = frame.height() / ratioHeight
        ratio = ratioHeight
      }

      log(targetLayer.class())

      frame.setX(newX)
      frame.setY(newY)

      if (targetLayer.class() != MSLayerGroup) {
        frame.setWidth(newW)
        frame.setHeight(newH)
      }

      switch (targetLayer.class()) {

        case MSTextLayer:

          const fontSize = targetLayer.fontSize();
          const characterSpacing = targetLayer.characterSpacing() || 0;
          targetLayer.setFontSize(fontSize / ratio);
          targetLayer.setCharacterSpacing(characterSpacing / ratio);

          const lineHeight = targetLayer.lineHeight();
          targetLayer.setLineHeight(lineHeight / ratio);

          frame.setX(frame.x())
          frame.setY(frame.y())
          frame.setWidth(frame.width() + 4)
          frame.setHeight(frame.height())

          break;

        case MSShapeGroup:

          if (targetLayer.style().borders() != null) {

            for (let i = 0; i < targetLayer.style().borders().count(); i++) {

              let borderStyle = targetLayer.style().borders()[i];
              let borderWidth = borderStyle.thickness();

              borderStyle.setThickness(borderWidth / ratio);

            }

          }

          for (let i = 0; i < targetLayer.layers().count(); i++) {

            let shapeLayer = targetLayer.layers()[i];

            if (shapeLayer.class() == MSRectangleShape) {

              let arr = [shapeLayer.cornerRadiusString().componentsSeparatedByString("/")][0];

              if (arr.count() > 1) {

                for (let i = 0; i < arr.count(); i++) {
                  let radius = arr[i];
                  arr[i] = radius / ratio;
                }
                shapeLayer.setCornerRadiusString(arr.componentsJoinedByString("/"));

              } else {

                let radius = shapeLayer.cornerRadiusFloat();
                shapeLayer.setCornerRadiusFloat(radius / ratio);

              }

            }
          }

          break;

        case MSLayerGroup:

          for (let i = 0; i < targetLayer.layers().count(); i++) {
            let layer = targetLayer.layers()[i];
            resizeProperty(layer, ratioWidth, ratioHeight);
          }

          break;
      }
    }

    function copyLayers() {
      for (let i = 0; i < layers.count(); i++) {

        let layer = layers[i];
        resizeProperty(layer, ratioWidth, ratioHeight);

      }
    }

    document.showMessage("Success!");

  }

  setup(context) {

    this.resize(context)
    log("complete");

  }

}
