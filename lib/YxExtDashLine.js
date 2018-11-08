/* eslint-disable */
module.exports = ({fabric}) => {
  if (fabric.YxExtDashLine) {
    fabric.warn('fabric.YxExtDashLine is already defined');
    return;
  }
  fabric.YxExtDashLine = fabric.util.createClass(fabric.Line, {
    typeExt: 'YxExtDashLine',
    strokeDashArray: [10, 5],
    toObject: function (propertiesToInclude) {
      return fabric.util.object.extend(this.callSuper('toObject', propertiesToInclude), {
        typeExt: this.typeExt
      });
    }
  });
};
