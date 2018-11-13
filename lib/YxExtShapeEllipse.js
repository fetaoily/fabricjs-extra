/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtShapeEllipse) {
    fabric.warn('fabric.YxExtShapeEllipse is already defined');
    return;
  }
  fabric.YxExtShapeEllipse = fabric.util.createClass(fabric.Ellipse, {
    typeExt: 'YxExtShapeEllipse',
    isYxExtShape: true,
    strokeDashArray: [],
    toObject: function (propertiesToInclude) {
      return fabric.util.object.extend(this.callSuper('toObject', propertiesToInclude), {
        typeExt: this.typeExt
      });
    },
    __YxExtHandleMouseDown (options) {
      let { layerX, layerY } = options.e;
      let stroke = this.canvas.freeDrawingBrush.color || 'red';
      let strokeWidth = this.canvas.freeDrawingBrush.width || 3;
      this.set({
        top: layerY,
        left: layerX,
        originX: 'center',
        originY: 'center',
        rx: 0,
        ry: 0,
        centeredRotation: true,
        fill: null,
        radius: 0,
        stroke,
        strokeWidth,
      });
    },
    __YxExtHandleMouseMove (options) {
      let { layerX, layerY } = options.e;
      let { top, left } = this;
      let rx = Math.abs(layerX - left);
      let ry = Math.abs(layerY - top);
      this.set({ rx, ry });
    },
    __YxExtHandleMouseUp (options) {
      // do nothing
    }
  });
};
