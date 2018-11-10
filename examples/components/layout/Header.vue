<template>
  <header class="layout-header">
    <!-- =========================================================================================================== -->
    <!-- 画板操作 -->
    <!-- =========================================================================================================== -->
    <el-button-group>
      <el-button v-on:click="setDrawingMode(false)" title="选择">
        <font-awesome-icon icon="hand-pointer"></font-awesome-icon>
      </el-button>
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
    <!-- =========================================================================================================== -->
    <!-- 更换背景图片 -->
    <!-- =========================================================================================================== -->
    <el-button-group>
      <el-button v-on:click="setBackgroundImageCenter(require('../../assets/img-bg/田字格.png'))">背景1</el-button>
      <el-button v-on:click="setBackgroundImageCenter(require('../../assets/img-bg/田字格（单个）.png'))">背景2</el-button>
    </el-button-group>
    <!-- =========================================================================================================== -->
    <!-- 更换前景图片 -->
    <!-- =========================================================================================================== -->
    <el-button-group>
      <el-button v-on:click="setOverlayImageCenter(require('../../assets/img-bg/田字格.png'))">前景1</el-button>
      <el-button v-on:click="setOverlayImageCenter(require('../../assets/img-bg/田字格（单个）.png'))">前景2</el-button>
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
      setDrawingMode (flag = true) {
        this.canvas && this.canvas.setDrawingMode(flag)
      },
      setDrawingModeForBrush () {
        window.__canvas.setDrawingModeForBrush({})
      },
      setDrawingModeForEraser () {
        window.__canvas.setDrawingModeForEraser({ width: 30 })
      },
      clearCanvas () {
        window.__canvas.clear();
      },
      setOverlayImageCenter (imageDataURL) {
        this.canvas && this.canvas.setOverlayImageCenter(imageDataURL, { opacity: 0.5 });
      },
      setBackgroundImageCenter (imageDataURL) {
        this.canvas && this.canvas.setBackgroundImageCenter(imageDataURL);
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
