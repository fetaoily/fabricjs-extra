/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtCircle) {
    fabric.warn('fabric.YxExtCircle is already defined');
    return;
  }
  fabric.YxExtCircle = fabric.util.createClass(fabric.Circle, {
    typeExt: 'YxExtCircle',
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
      let radius = Math.max(Math.abs(layerX - left), Math.abs(layerY - top));
      console.info(radius);
      this.set({ radius });
    },
    __YxExtHandleMouseUp (options) {
      // do nothing
    }
  });
};
