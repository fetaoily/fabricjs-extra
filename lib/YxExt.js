module.exports = ({ fabric }) => {
  fabric.util.object.extend(fabric.Canvas.prototype, {
    isDrawingMode: false,
    isDrawingModeForBrush: false,
    isDrawingModeForEraser: false,
    setDrawingMode (flag = true) {
      this.isDrawingMode = !!flag;
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
};
