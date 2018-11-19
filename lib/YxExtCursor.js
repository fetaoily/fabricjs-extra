/* eslint-disable */
module.exports = ({ fabric }) => {
  /**
   * 初始化绘图事件
   */
  fabric.util.object.extend(fabric.Canvas.prototype, {
    __YxExtCursor: null,
    __YxExtCursorMouseDown: false,
    __YxExtCursorInitialized: false,
    setYxExtCursor (oImg) {
      this.__YxExtCursorHide();
      this.__YxExtCursor = window.document.createElement('img');
      this.__YxExtCursor.id = '__YxExtCursor';
      this.__YxExtCursor.src = oImg.toDataURL();
      this.__YxExtCursorInitialize();
    },
    setYxExtCursorFromImageURL (imgUrl) {
      fabric.Image.fromURL(imgUrl, (oImg) => {
        this.setYxExtCursor(oImg);
      });
    },
    __YxExtCursorStyle ({ pageX = 0, pageY = 0 }) {
      this.__YxExtCursor.style = `position:absolute;left:${pageX + 2}px;top:${pageY + 2}px;opacity:0.8;`;
    },
    __YxExtCursorHide () {
      let oldYxExtCursorImgEl = document.getElementById('__YxExtCursor');
      if (oldYxExtCursorImgEl) {
        document.body.removeChild(oldYxExtCursorImgEl);
      }
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
        let { pageX, pageY } = options.e;
        this.__YxExtCursorStyle({ pageX, pageY });
        document.body.appendChild(this.__YxExtCursor);
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
        let { pageX, pageY } = options.e;
        this.__YxExtCursorStyle({ pageX, pageY });
      });
      /**
       * 鼠标抬起
       */
      this.on('mouse:up', (options) => {
        this.__YxExtCursorMouseDown = false;
        if (!this.__YxExtCursor) {
          return;
        }
        this.__YxExtCursorHide();
      });
    }
  });
};
