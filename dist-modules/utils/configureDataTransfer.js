"use strict";

var shouldUseDragPreview = require("./shouldUseDragPreview"),
    getDragImageOffset = require("./getDragImageOffset"),
    getBrowserEffectAllowed = require("./getBrowserEffectAllowed");

function configureDataTransfer(containerNode, nativeEvent, dragPreview, dragAnchors, effectsAllowed) {
  var dataTransfer = nativeEvent.dataTransfer;


  try {
    // Firefox won't drag without setting data
    dataTransfer.setData("application/json", {});
  } catch (err) {}

  if (shouldUseDragPreview(dragPreview) && dataTransfer.setDragImage) {
    var dragOffset = getDragImageOffset(containerNode, dragPreview, dragAnchors, nativeEvent);
    dataTransfer.setDragImage(dragPreview, dragOffset.x, dragOffset.y);
  }

  dataTransfer.effectAllowed = getBrowserEffectAllowed(effectsAllowed);
}

module.exports = configureDataTransfer;
// IE doesn't support MIME types in setData