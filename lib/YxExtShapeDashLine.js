/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtShapeDashLine) {
    fabric.warn('fabric.YxExtShapeDashLine is already defined');
    return;
  }
  fabric.YxExtShapeDashLine = fabric.util.createClass(fabric.Line, {
    typeForYxExt: 'YxExtShapeDashLine',
    isYxExtShape: true,
    strokeDashArray: [10, 5],
    toObject: function (propertiesToInclude) {
      return fabric.util.object.extend(this.callSuper('toObject', propertiesToInclude), {
        typeForYxExt: this.typeForYxExt,
        isYxExtShape: this.isYxExtShape
      });
    },
    __YxExtHandleMouseDown (options) {
      let { layerX, layerY } = options.e;
      let x1 = x2 = layerX;
      let y1 = y2 = layerY;
      let stroke = this.canvas.freeDrawingBrush.color || 'red';
      let strokeWidth = this.canvas.freeDrawingBrush.width || 3;
      this.set({
        x1, y1, x2, y2,
        stroke,
        strokeWidth,
        selectable: false
      });
    },
    __YxExtHandleMouseMove (options) {
      let { layerX, layerY } = options.e;
      if (layerX <= 0 && layerY <= 0) {
        return;
      }
      this.set({ x2: layerX, y2: layerY });
    },
    __YxExtHandleMouseUp (options) {
      let { x1, y1, x2, y2 } = this;
      if (x1 === x2 && y1 === y2) {
        this.canvas.remove(this);
        return
      }
      this.setCoords()
    }
  });
};
