/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtEraserPath) {
    fabric.warn('fabric.YxExtEraserPath is already defined');
    return;
  }
  let typeForYxExt = 'YxExtEraserPath';
  fabric.YxExtEraserPath = fabric.util.createClass(fabric.Path, {
    typeForYxExt,
    globalCompositeOperation: 'destination-out',
    toObject (propertiesToInclude) {
      return fabric.util.object.extend( this.callSuper('toObject', propertiesToInclude), { typeForYxExt })
    }
  });
};
