/* eslint-disable */
module.exports = ({ fabric }) => {
  let typeExt = 'YxExtEraserPath';
  fabric.YxExtEraserPath = fabric.util.createClass(fabric.Path, {
    typeExt,
    globalCompositeOperation: 'destination-out',
    toObject (propertiesToInclude) {
      return fabric.util.object.extend(this.callSuper('toObject', propertiesToInclude), { typeExt })
    }
  });
};
