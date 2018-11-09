/* eslint-disable */
module.exports = ({ fabric }) => {
  /**
   * isDrawingMode,
   * isDrawingModeForBrush,
   * isDrawingModeForEraser
   */
  fabric.util.object.extend(fabric.Canvas.prototype, {
    isDrawingMode: false,
    isDrawingModeForBrush: false,
    isDrawingModeForEraser: false,
    setDrawingMode (flag = true) {
      this.isDrawingMode = !!flag;
      if (this.isDrawingMode) {
        this.setDrawingModeForBrush();
      } else {
        this.isDrawingModeForBrush = false;
        this.isDrawingModeForEraser = false;
      }
    },
    setDrawingModeForBrush () {
      this.isDrawingMode = true;
      this.isDrawingModeForBrush = true;
      this.isDrawingModeForEraser = false;
      this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this);
    },
    setDrawingModeForEraser ({ width = 30 }) {
      this.isDrawingMode = true;
      this.isDrawingModeForBrush = false;
      this.isDrawingModeForEraser = true;
      this.freeDrawingBrush = fabric.PencilBrush && new fabric.YxExtEraserBrush(this);
      this.freeDrawingBrush.width = width;
      this.freeDrawingBrush.color = this.backgroundColor || '#FFFFFF';
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
};
