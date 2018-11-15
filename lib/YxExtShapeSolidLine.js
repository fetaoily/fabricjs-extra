/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtShapeSolidLine) {
    fabric.warn('fabric.YxExtShapeSolidLine is already defined');
    return;
  }
  fabric.YxExtShapeSolidLine = fabric.util.createClass(fabric.Line, {
    typeForYxExt: 'YxExtShapeSolidLine',
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
      let x1 = x2 = layerX;
      let y1 = y2 = layerY;
      let stroke = this.canvas.freeDrawingBrush.color || 'red';
      let strokeWidth = this.canvas.freeDrawingBrush.width || 3;
      this.set({
        x1, y1, x2, y2,
        stroke,
        strokeWidth,
        selectable: false,
      });
    },
    __YxExtHandleMouseMove (options) {
      let { layerX, layerY } = options.e;
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
