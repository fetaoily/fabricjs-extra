/* eslint-disable */
module.exports = ({ fabric }) => {
  require('./YxExtEraserPath')({ fabric });
  require('./YxExtEraserPathV2')({ fabric });
  require('./YxExtEraserBrush')({ fabric });
  require('./YxExtEraserBrushV2')({ fabric });
  fabric.util.object.extend(fabric.Canvas.prototype, {
    __YxExtEraserRefresh () {
      this.forEachObject((object) => {
        if (object.typeExt === 'YxExtEraserPathV2') {
          object.set({ color: this.backgroundColor });
        }
      });
      this.requestRenderAll();
    },
    loadFromJSONForYxExt (json, callback, reviver) {
      this.loadFromJSON(json, () => {
        this.__YxExtEraserRefresh();
        callback && callback();
      }, reviver);
    },
    setBackgroundColor (backgroundColor, callback) {
      this.__YxExtEraserRefresh();
      return this.__setBgOverlayColor('backgroundColor', backgroundColor, callback);
    },
    setBackgroundColorForYxExt (backgroundColor, callback) {
      return this.setBackgroundColor(backgroundColor, callback);
    }
  });
};
