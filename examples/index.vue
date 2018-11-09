<template>
  <div class="fabricjs-extra-examples">
    <el-container>
      <el-header v-if="canvas">
        <LayoutHeader>Header</LayoutHeader>
      </el-header>
      <el-container>
        <el-main>
          <div class="app-main">
            <canvas class="fabricjs-extra-examples-canvas" id="c"></canvas>
          </div>
        </el-main>
      </el-container>
      <el-footer>
        <LayoutFooter>Footer</LayoutFooter>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
  import { fabric } from '../index';
  import './index.css';
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faUndo, faRedo, faBrush, faEraser, faHandPointer } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import LayoutFooter from './components/layout/Footer';
  import LayoutHeader from './components/layout/Header';

  Vue.use(ElementUI);
  Vue.use(FontAwesomeIcon);

  library.add(faUndo, faRedo, faBrush, faEraser, faHandPointer);
  Vue.component('font-awesome-icon', FontAwesomeIcon);

  window.fabric = window.fabric || fabric;
  export default {
    components: { LayoutFooter, LayoutHeader },
    data () {
      return {
        msg: 'Examples',
        canvas: null
      }
    },
    mounted () {
      this.initFabricCanvas();
      this.initWindowResizeEventHandler();
    },
    methods: {
      initFabricCanvas () {
        let { width, height } = this.getCanvasWidthAndHeight();
        window.__canvas = this.canvas = new fabric.Canvas('c', {
            width, height, isDrawingMode: true
          }
        );
        window.__canvas.freeDrawingBrush = new fabric.YxExtEraserBrush(window.__canvas);
        let rect = new fabric.Rect({
          top: 100,
          left: 100,
          fill: 'red',
          width: 60,
          height: 70
        });
        let dashLine = new fabric.YxExtDashLine([200, 10, 500, 300], {
          fill: 'red',
          stroke: 'red',
          strokeWidth: 5,
          selectable: true
        });
        this.canvas.add(rect);
        this.canvas.add(dashLine);
        this.canvas.renderAll();
      },
      initWindowResizeEventHandler () {
        window.onresize = () => {
          let { width, height } = this.getCanvasWidthAndHeight();
          window.__canvas.setWidth(width);
          window.__canvas.setHeight(height);
          window.__canvas.renderAll();
        }
      },
      getCanvasWidthAndHeight () {
        let cEl = document.querySelector('div.app-main');
        let { clientWidth, clientHeight } = cEl;
        return { width: clientWidth, height: clientHeight }
      }
    }
  }
</script>
<style>
  .fabricjs-extra-examples {
    width: 100vw;
    height: 100vh;
  }

  .fabricjs-extra-examples-canvas {
    flex: 1;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px #B00000;
    border-radius: 10px;
  }
</style>
