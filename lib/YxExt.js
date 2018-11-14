/* eslint-disable */
module.exports = ({ fabric }) => {
  /**
   * isDrawingMode,
   * isDrawingModeForBrush,
   * isDrawingModeForEraser
   */
  fabric.util.object.extend(fabric.Canvas.prototype, {
    isDrawingMode: false,
    isSelectionMode: false,
    drawingShapesModeType: null,
    isDrawingModeForBrush: false,   // 画笔模式
    isDrawingModeForEraser: false,  // 橡皮模式
    isDrawingModeForShapes: false,  // 绘图模式
    isDrawingModeForShapesStarted: false, // 绘图模式已开启
    __YxExtCurrentDrawingShape: null,// 绘图模式: 当前正在绘制的图形
    /**
     * 设置画笔/选择模式
     * @param flag
     */
    setDrawingMode (flag = true) {
      this.isDrawingMode = !!flag;
      this.isSelectionMode = false;
      if (this.isDrawingMode) {
        this.setDrawingModeForBrush();
      } else {
        this.isDrawingModeForBrush = false;
        this.isDrawingModeForEraser = false;
        this.isDrawingModeForShapes = false;
      }
    },

    /**
     * 设置选择模式
     * @param flag
     */
    setSelectionMode (flag = true) {
      this.isDrawingMode = false;
      this.isDrawingModeForBrush = false;
      this.isDrawingModeForEraser = false;
      this.isDrawingModeForShapes = false;
      this.isSelectionMode = !!flag;
      this.forEachObject((object) => {
        object.set({ selectable: this.isSelectionMode })
      });
    },
    /**
     * 画笔模式
     * @param width
     * @param color
     */
    setDrawingModeForBrush ({ width = 30, color = '#000000' }) {
      this.isDrawingMode = true;
      this.isSelectionMode = false;
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
      this.isSelectionMode = false;
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
      this.drawingShapeModeEventsInitialize();
      this.selection = false;
      this.isSelectionMode = false;
      this.isDrawingMode = false;
      this.isSelectionMode = false;
      this.isDrawingModeForBrush = false;
      this.isDrawingModeForEraser = false;
      this.isDrawingModeForShapes = true;
      this.drawingShapesModeType = fabric[shapeType];
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
  /**
   * 初始化绘图事件
   */
  fabric.util.object.extend(fabric.Canvas.prototype, {
    drawingShapeModeEventsInitialized: false,
    drawingShapeModeEventsInitialize () {
      if (this.drawingShapeModeEventsInitialized) {
        console.info('Drawing Shape Mode Events already Initialized!');
        return;
      }
      this.drawingShapeModeEventsInitialized = true;
      /**
       * 鼠标按下
       */
      this.on('mouse:down', (options) => {
        if (!this.isDrawingModeForShapes) {
          return;
        }
        this.isDrawingModeForShapesStarted = true;
        try {
          this.__YxExtCurrentDrawingShape = new this.drawingShapesModeType();
        } catch (e) {
          this.__YxExtCurrentDrawingShape = null;
        }
        if (!this.__YxExtCurrentDrawingShape) {
          return;
        }
        if (!this.__YxExtCurrentDrawingShape.isYxExtShape) {
          return;
        }
        this.add(this.__YxExtCurrentDrawingShape);
        this.__YxExtCurrentDrawingShape.__YxExtHandleMouseDown(options);
        this.renderAll();
      });
      /**
       * 鼠标移动
       */
      this.on('mouse:move', (options) => {
        if (!this.isDrawingModeForShapes) {
          return;
        }
        if (!this.isDrawingModeForShapesStarted) {
          return;
        }
        if (!this.__YxExtCurrentDrawingShape) {
          return;
        }
        this.__YxExtCurrentDrawingShape.__YxExtHandleMouseMove(options);
        this.renderAll();
      });
      /**
       * 鼠标抬起
       */
      this.on('mouse:up', (options) => {
        this.isDrawingModeForShapesStarted = false;
        if (!this.isDrawingModeForShapes) {
          return;
        }
        if (!this.__YxExtCurrentDrawingShape) {
          return;
        }
        this.__YxExtCurrentDrawingShape.__YxExtHandleMouseUp(options);
        this.renderAll();
      });
    }
  });
};
