/* eslint-disable */
module.exports = ({ fabric }) => {
  /**
   * isDrawingMode,
   * isDrawingModeForBrush,
   * isDrawingModeForEraser
   */
  fabric.util.object.extend(fabric.Canvas.prototype, {
    isDrawingMode: false,
    drawingShapesModeType: null,
    isDrawingModeForBrush: false,   // 画笔模式
    isDrawingModeForEraser: false,  // 橡皮模式
    isDrawingModeForShapes: false,  // 绘图模式
    /**
     * 设置画笔/选择模式
     * @param flag
     */
    setDrawingMode (flag = true) {
      this.isDrawingMode = !!flag;
      if (this.isDrawingMode) {
        this.setDrawingModeForBrush();
      } else {
        this.isDrawingModeForBrush = false;
        this.isDrawingModeForEraser = false;
        this.isDrawingModeForShapes = false;
      }
    },
    /**
     * 画笔模式
     * @param width
     * @param color
     */
    setDrawingModeForBrush ({ width = 30, color = '#000000' }) {
      this.isDrawingMode = true;
      this.isDrawingModeForBrush = true;
      this.isDrawingModeForEraser = false;
      this.isDrawingModeForShapes = false;
      this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this);
      this.freeDrawingBrush.width = width;
      this.freeDrawingBrush.color = color;
    },
    /**
     * 橡皮模式
     * @param width
     * @param color
     */
    setDrawingModeForEraser ({ width = 30, color = this.backgroundColor }) {
      this.isDrawingMode = true;
      this.isDrawingModeForBrush = false;
      this.isDrawingModeForEraser = true;
      this.isDrawingModeForShapes = false;
      this.freeDrawingBrush = fabric.PencilBrush && new fabric.YxExtEraserBrush(this);
      this.freeDrawingBrush.width = width;
      this.freeDrawingBrush.color = color || this.backgroundColor || '#FFFFFF';
    },
    /**
     * 图形模式
     * @param shapeType
     */
    setDrawingModeForShapes ({ shapeType }) {
      this.isDrawingMode = false;
      this.isDrawingModeForBrush = false;
      this.isDrawingModeForEraser = false;
      this.isDrawingModeForShapes = true;
      this.freeDrawingBrush = null;
      this.drawingShapesModeType = shapeType;
    }
  });
  /**
   * undo/redo
   */
  fabric.util.object.extend(fabric.Canvas.prototype, {
    __yx_ext_undo_redo_history: [],
    undo () {
      if (this._objects.length) {
        let item = this._objects.pop();
        this.__yx_ext_undo_redo_history.push(item);
        this.renderAll();
      }
    },
    redo () {
      if (this.__yx_ext_undo_redo_history.length) {
        let item = this.__yx_ext_undo_redo_history.pop();
        this.add(item);
        this.renderAll();
      }
    }
  });
  /**
   * setOverlayImageCenter
   */
  fabric.util.object.extend(fabric.Canvas.prototype, {
    setOverlayImageCenter (image, options) {
      let cW = this.getWidth();
      let cH = this.getHeight();
      this.setOverlayImage(image, () => {
        let overlayImage = this.overlayImage;
        if (overlayImage) {
          let olImgW = overlayImage.get('width');
          let olImgH = overlayImage.get('height');
          let olImgT = (cH - olImgH) / 2;
          let olImgL = (cW - olImgW) / 2;
          overlayImage.set({ top: olImgT, left: olImgL, width: olImgW, height: olImgH });
        }
        this.renderAll();
      }, options);
    }
  });
  /**
   * setBackgroundImageCenter
   */
  fabric.util.object.extend(fabric.Canvas.prototype, {
    setBackgroundImageCenter (image, options) {
      let cW = this.getWidth();
      let cH = this.getHeight();
      this.setBackgroundImage(image, () => {
        let backgroundImage = this.backgroundImage;
        if (backgroundImage) {
          let bgImgW = backgroundImage.get('width');
          let bgImgH = backgroundImage.get('height');
          let bgImgT = (cH - bgImgH) / 2;
          let bgImgL = (cW - bgImgW) / 2;
          backgroundImage.set({ top: bgImgT, left: bgImgL, width: bgImgW, height: bgImgH });
        }
        this.renderAll();
      }, options);
    }
  });
};
