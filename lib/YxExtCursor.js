/* eslint-disable */
module.exports = ({ fabric }) => {
  /**
   * 初始化绘图事件
   */
  fabric.util.object.extend(fabric.Canvas.prototype, {
    __YxExtCursor: null,
    __YxExtCursorMouseDown: false,
    __YxExtCursorInitialized: false,
    setYxExtCursor (cursorObj) {
      this.__YxExtCursor = cursorObj;
      this.__YxExtCursorInitialize();
    },
    setYxExtCursorFromImageURL (imgUrl) {
      fabric.Image.fromURL(imgUrl, (oImg) => {
        this.setYxExtCursor(oImg);
      });
    },
    __YxExtCursorInitialize () {
      if (this.__YxExtCursorInitialized) {
        console.info('YxExtCursor Events already Initialized!');
        return;
      }
      this.__YxExtCursorInitialized = true;
      /**
       * 鼠标按下
       */
      this.on('mouse:down', (options) => {
        if (!this.__YxExtCursor) {
          return;
        }
        this.__YxExtCursorMouseDown = true;
        let { layerX, layerY } = options.e;
        this.__YxExtCursor.set({ left: layerX, top: layerY });
        this.add(this.__YxExtCursor);
      });
      /**
       * 鼠标移动
       */
      this.on('mouse:move', (options) => {
        if (!this.__YxExtCursor) {
          return;
        }
        if (!this.__YxExtCursorMouseDown) {
          return;
        }
        let { layerX, layerY } = options.e;
        this.__YxExtCursor.set({ left: layerX, top: layerY });
        this.requestRenderAll();
      });
      /**
       * 鼠标抬起
       */
      this.on('mouse:up', (options) => {
        this.__YxExtCursorMouseDown = false;
        if (!this.__YxExtCursor) {
          return;
        }
        this.remove(this.__YxExtCursor);
      });
    }
  });
};
