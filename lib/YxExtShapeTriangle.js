/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtShapeTriangle) {
    fabric.warn('fabric.YxExtShapeTriangle is already defined');
    return;
  }
  fabric.YxExtShapeTriangle = fabric.util.createClass(fabric.Triangle, {
    typeForYxExt: 'YxExtShapeTriangle',
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
        width: 0,
        height: 0,
        fill: null,
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
      let width = Math.abs(layerX - left);
      let height = Math.abs(layerY - top);
      this.set({ width, height });
    },
    __YxExtHandleMouseUp (options) {
      let { width, height } = this;
      if (width === 0 || height === 0) {
        this.canvas.remove(this);
        return
      }
      this.setCoords()
    }
  });
};
