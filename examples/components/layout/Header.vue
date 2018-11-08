<template>
  <header class="layout-header">
    <el-button-group>
      <el-button v-on:click="setDrawingModeForBrush">画笔</el-button>
      <el-button v-on:click="setDrawingModeForEraser">橡皮</el-button>
      <el-button v-on:click="">撤销</el-button>
      <el-button v-on:click="">回撤</el-button>
      <el-button v-on:click="clearCanvas">清屏</el-button>
    </el-button-group>
  </header>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      setDrawingModeForBrush () {
        window.__canvas.setDrawingModeForBrush()
      },
      setDrawingModeForEraser () {
        window.__canvas.setDrawingModeForEraser({ width: 30 })
      },
      clearCanvas(){
        window.__canvas.clear();
      }
    }
  }
</script>

<style>
  .layout-header {
    height: 100%;
    border: solid 1px red;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
