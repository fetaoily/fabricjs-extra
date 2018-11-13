<template>
  <header class="layout-header">
    <!-- =========================================================================================================== -->
    <!-- 选择画笔宽度和颜色 -->
    <!-- =========================================================================================================== -->
    <el-popover ref="popover1">
      <div class="layout-header-popover1">
        <div class="layout-header-popover1-brush-width">
          <div class="layout-header-popover1-brush-width-item" v-for="(item,idx) in [5,10,20,30]"
               v-on:click="setDrawingModeForBrush({width:item})">
            <div class="layout-header-popover1-brush-width-item-body"
                 v-bind:style="{width:`${item}px`,height:`${item}px`,'border-radius':`${item/2}px`}">{{item}}
            </div>
          </div>
        </div>
        <div class="layout-header-popover1-brush-color">
          <div class="layout-header-popover1-brush-color-item"
               v-for="(item,idx) in ['#FF0000','#0FF000','#00FF00','#000FF0','#0000FF','#F0000F']"
               v-on:click="setDrawingModeForBrush({color:item})"
               v-bind:style="{backgroundColor:`${item}`}">
          </div>
        </div>
      </div>
    </el-popover>
    <!-- =========================================================================================================== -->
    <!-- 选择图形 -->
    <!-- =========================================================================================================== -->
    <el-popover ref="popover2">
      <div class="layout-header-popover2">
        <div class="layout-header-popover2-title">选择图形</div>
        <div class="layout-header-popover2-body">
          <div class="layout-header-popover2-body-item"
               v-on:click="setDrawingModeForShapes({shapeType:'YxExtShapeDashLine'})">虚线
          </div>
          <div class="layout-header-popover2-body-item"
               v-on:click="setDrawingModeForShapes({shapeType:'YxExtShapeSolidLine'})">实线
          </div>
          <div class="layout-header-popover2-body-item"
               v-on:click="setDrawingModeForShapes({shapeType:'YxExtShapeCircle'})">圆形
          </div>
          <div class="layout-header-popover2-body-item"
               v-on:click="setDrawingModeForShapes({shapeType:'YxExtShapeSquare'})">正方形
          </div>
          <div class="layout-header-popover2-body-item"
               v-on:click="setDrawingModeForShapes({shapeType:'YxExtShapeRectangle'})">长方形
          </div>
        </div>
      </div>
    </el-popover>
    <!-- =========================================================================================================== -->
    <!-- 画板操作 -->
    <!-- =========================================================================================================== -->
    <el-button-group>
      <el-button v-on:click="setDrawingMode(false)" title="选择">
        <font-awesome-icon icon="hand-pointer"></font-awesome-icon>
      </el-button>
      <el-button v-on:click="setDrawingModeForBrush({})" title="画笔" v-popover:popover1>
        <font-awesome-icon icon="brush"></font-awesome-icon>
      </el-button>
      <el-button v-on:click="setDrawingModeForShapes({})" title="图形" v-popover:popover2>
        <font-awesome-icon icon="shapes"></font-awesome-icon>
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
        canvas: null,
        brushWidth: 10,
        brushColor: 'red'
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
      closePopover () {
        this.$refs.popover1.doClose();
        this.$refs.popover2.doClose();
      },
      setDrawingMode (flag = true) {
        this.canvas && this.canvas.setDrawingMode(flag)
      },
      setDrawingModeForBrush ({ width, color }) {
        this.closePopover();
        this.brushWidth = width || this.brushWidth;
        this.brushColor = color || this.brushColor;
        console.info(this.brushWidth);
        console.info(this.brushColor);
        window.__canvas.setDrawingModeForBrush({ width: this.brushWidth, color: this.brushColor });
      },
      setDrawingModeForShapes ({ shapeType }) {
        if (!shapeType) {
          return;
        }
        this.closePopover();
        this.canvas.setDrawingModeForShapes({ shapeType });
        this.$message.success(shapeType);
      },
      setDrawingModeForEraser () {
        window.__canvas.setDrawingModeForEraser({ width: 30 })
      },
      clearCanvas () {
        window.__canvas.clear();
      },
      setOverlayImageCenter (imageDataURL) {
        this.canvas && this.canvas.setOverlayImageCenter(imageDataURL, { opacity: 0.8 });
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

  .layout-header-popover1 {
    display: flex;
    flex-direction: column;
  }

  .layout-header-popover1-brush-width {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .layout-header-popover1-brush-width-item {
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .layout-header-popover1-brush-width-item-body {
    border: solid 1px green;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .layout-header-popover1-brush-color {
    padding: 10px;
    display: flex;
    flex-direction: row;
  }

  .layout-header-popover1-brush-color-item {
    width: 40px;
    height: 20px;
    cursor: pointer;
    margin-left: 5px;
    margin-right: 5px;
  }

  .layout-header-popover2 {
    display: flex;
    flex-direction: column;
  }

  .layout-header-popover2-title {
    font-size: 16px;
    font-weight: 800;
  }

  .layout-header-popover2-body {
    display: flex;
    flex-direction: row;

  }

  .layout-header-popover2-body-item {
    width: 40px;
    height: 40px;
    margin: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: whitesmoke;
  }

  .layout-header-popover2-body-item:hover {
    color: white;
    font-weight: 800;
    background-color: black;
  }
</style>
