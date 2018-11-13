/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtDashLine) {
    fabric.warn('fabric.YxExtDashLine is already defined');
    return;
  }
  fabric.YxExtDashLine = fabric.util.createClass(fabric.Line, {
    typeExt: 'YxExtDashLine',
    isYxExtShape: true,
    strokeDashArray: [10, 5],
    toObject: function (propertiesToInclude) {
      return fabric.util.object.extend(this.callSuper('toObject', propertiesToInclude), {
        typeExt: this.typeExt
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
      });
    },
    __YxExtHandleMouseMove (options) {
      let { layerX, layerY } = options.e;
      this.set({ x2: layerX, y2: layerY });
    },
    __YxExtHandleMouseUp (options) {
      // do nothing
    }
  });
};
