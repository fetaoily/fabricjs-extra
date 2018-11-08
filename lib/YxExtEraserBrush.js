/* eslint-disable */
module.exports = ({ fabric }) => {
  const YxExtEraserPath = require('./YxExtEraserPath');
  fabric.YxExtEraserBrush = fabric.util.createClass(fabric.PencilBrush, {
    createPath: function (pathData) {
      let path = new YxExtEraserPath(pathData, {
        fill: null,
        stroke: this.color,
        strokeWidth: this.width,
        strokeLineCap: this.strokeLineCap,
        strokeMiterLimit: this.strokeMiterLimit,
        strokeLineJoin: this.strokeLineJoin,
        strokeDashArray: this.strokeDashArray,
      });
      let position = new fabric.Point(path.left + path.width / 2, path.top + path.height / 2);
      position = path.translateToGivenOrigin(position, 'center', 'center', path.originX, path.originY);
      path.top = position.y;
      path.left = position.x;
      if (this.shadow) {
        this.shadow.affectStroke = true;
        path.setShadow(this.shadow);
      }
      return path;
    }
  });
};
