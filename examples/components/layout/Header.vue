<template>
  <header class="layout-header">
    <el-button-group>
      <el-button v-on:click="setDrawingModeForBrush" title="画笔">
        <font-awesome-icon icon="brush"></font-awesome-icon>
      </el-button>
      <el-button v-on:click="setDrawingModeForEraser" title="橡皮">
        <font-awesome-icon icon="eraser"></font-awesome-icon>
      </el-button>
      <el-button v-on:click="undo" title="撤销">
        <font-awesome-icon icon="undo"></font-awesome-icon>
      </el-button>
      <el-button v-on:click="redo" title="回撤">
        <font-awesome-icon icon="redo"></font-awesome-icon>
      </el-button>
      <el-button v-on:click="clearCanvas">清屏</el-button>
    </el-button-group>
  </header>
</template>

<script>
  export default {
    name: "Header",
    data () {
      return {
        canvas: null
      }
    },
    mounted () {
      this.canvas = window.__canvas;
    },
    updated () {
      this.canvas = window.__canvas;
    },
    methods: {
      undo () {
        this.canvas && this.canvas.undo()
      },
      redo () {
        this.canvas && this.canvas.redo()
      },
      setDrawingModeForBrush () {
        window.__canvas.setDrawingModeForBrush()
      },
      setDrawingModeForEraser () {
        window.__canvas.setDrawingModeForEraser({ width: 30 })
      },
      clearCanvas () {
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
