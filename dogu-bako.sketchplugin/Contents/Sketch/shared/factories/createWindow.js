/// Create Sketch Window
function createWindow(contentView, frame, { onClose }) {

  const panel = NSPanel.alloc().init();
  panel.setFrame_display(
    frame,
    true
  );

  panel.setStyleMask(
    NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask
  );
  panel.setTitle("Find layer");
  panel.setTitlebarAppearsTransparent(true);

  panel.becomeKeyWindow();
  panel.setLevel(NSFloatingWindowLevel);
  panel.contentView().addSubview(contentView);
  panel.center();
  panel.makeKeyAndOrderFront(nil);

  panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
  panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);

  const closeButton = panel.standardWindowButton(NSWindowCloseButton);
  closeButton.setCOSJSTargetFunction(() => {
    onClose();
  });

  closeButton.setAction("callAction:");

  return panel;

}
