<template>
  <div class="fabricjs-extra-examples">
    <canvas class="fabricjs-extra-examples-canvas" id="c"></canvas>
  </div>
</template>
<script>
  import { fabric } from 'fabric';
  import { YxExtDashLine } from '../index';
  import './index.css';
  console.info('==========================');
  console.info(YxExtDashLine);
  console.info('==========================');

  window.fabric = window.fabric || fabric;
  export default {
    data () {
      return {
        msg: 'Examples',
        canvas: null
      }
    },
    mounted () {
      this.initFabricCanvas()
    },
    methods: {
      initFabricCanvas () {
        let width = window.innerWidth * 0.9;
        let height = window.innerHeight * 0.9;
        window.__canvas = this.canvas = new fabric.Canvas('c', {
            width, height
          }
        );
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
      }
    }
  }
</script>
<style>
  .fabricjs-extra-examples {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fabricjs-extra-examples-canvas {
    box-shadow: 0 0 10px #B00000;
    border-radius: 10px;
  }
</style>
