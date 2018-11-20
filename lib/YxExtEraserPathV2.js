/* eslint-disable */
module.exports = ({ fabric }) => {
  if (fabric.YxExtEraserPathV2) {
    fabric.warn('fabric.YxExtEraserPathV2 is already defined');
    return;
  }
  let typeExt = 'YxExtEraserPathV2';
  fabric.YxExtEraserPathV2 = fabric.util.createClass(fabric.Path, {
    typeExt,
    toObject (propertiesToInclude) {
      return fabric.util.object.extend(this.callSuper('toObject', propertiesToInclude), { typeExt })
    }
  });
};
