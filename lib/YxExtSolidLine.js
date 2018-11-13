/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtSolidLine) {
    fabric.warn('fabric.YxExtSolidLine is already defined');
    return;
  }
  fabric.YxExtSolidLine = fabric.util.createClass(fabric.Line, {
    typeExt: 'YxExtSolidLine',
    isYxExtShape: true,
    strokeDashArray: [],
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
