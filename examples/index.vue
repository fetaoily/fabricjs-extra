<template>
  <div class="fabricjs-extra-examples">
    <canvas class="fabricjs-extra-examples-canvas" id="c"></canvas>
  </div>
</template>
<script>
  import { fabric } from 'fabric';
  import '../index';
  import './index.css';

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
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.canvas = new fabric.Canvas('c', {
            width, height
          }
        );
        let rect = new fabric.Rect({
          top: 100,
          left: 100,
          width: 60, height: 70,
          fill: 'red'
        });
        this.canvas.add(rect);
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
    width: 100vw;
    height: 100vh;
  }
</style>
