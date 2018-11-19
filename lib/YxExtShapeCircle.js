/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtShapeCircle) {
    fabric.warn('fabric.YxExtShapeCircle is already defined');
    return;
  }
  fabric.YxExtShapeCircle = fabric.util.createClass(fabric.Circle, {
    typeForYxExt: 'YxExtShapeCircle',
    isYxExtShape: true,
    strokeDashArray: [],
    toObject: function (propertiesToInclude) {
      return fabric.util.object.extend(this.callSuper('toObject', propertiesToInclude), {
        typeForYxExt: this.typeForYxExt,
        isYxExtShape: this.isYxExtShape
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
        selectable: false,
      });
    },
    __YxExtHandleMouseMove (options) {
      let { layerX, layerY } = options.e;
      if (layerX <= 0 && layerY <= 0) {
        return;
      }
      let { top, left } = this;
      let radius = Math.max(Math.abs(layerX - left), Math.abs(layerY - top));
      this.set({ radius });
    },
    __YxExtHandleMouseUp (options) {
      let { radius } = this;
      if (radius === 0) {
        this.canvas.remove(this);
        return
      }
      this.setCoords()
    }
  });
};
