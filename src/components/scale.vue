<template>
  <div class="mask" @click="hideMask" @touchmove.prevent>
    <div class="scale">
      <div class="scaleItem" @click.stop="() => {}">
        <img src="../assets/hb2.png" alt="" />
        <div class="canvasWrap">
          <canvas id="canvas" width="200" height="80"></canvas>
          <div class="content">{{ money }}元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "_vue@3.2.29@vue";
export default {
  props: {
    money: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    let myCanvas = ref("");
    const drawArc = (e, ctx) => {
      let canvasPos = myCanvas.getBoundingClientRect();
      let pageScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let pageScrollLeft =
        document.documentElement.scrollLeft || document.body.scrollLeft;
      let mouseX =
        (e.pageX || e.targetTouches[0].pageX) - canvasPos.left - pageScrollLeft;
      let mouseY =
        (e.pageY || e.targetTouches[0].pageY) - canvasPos.top - pageScrollTop;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.moveTo(mouseX, mouseY);
      ctx.arc(mouseX, mouseY, 6, 0, 2 * Math.PI);
      ctx.fill();
    };
    const calcArea = (ctx) => {
      let myImg = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
      let num = 0;
      let max = myImg.data.length / 4;
      for (let i = 0; i < myImg.data.length; i += 4) {
        if (myImg.data[i + 3] == 0) {
          num++;
        }
      }
      if (num >= max * 0.4) {
        myCanvas.remove();
      }
    };
    onMounted(() => {
      myCanvas = document.getElementById("canvas");
      let ctx = myCanvas.getContext("2d");
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ccc";
      ctx.fillRect(0, 0, 200, 80);
      // 文本
      ctx.fillStyle = "#000";
      ctx.font = "18px 微软雅黑";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("你刮你试试？", 100, 42);

      let flag = false;
      myCanvas.addEventListener("touchstart", function (e) {
        flag = true;
        drawArc(e, ctx);
      });
      myCanvas.addEventListener("touchmove", function (e) {
        if (flag == true) {
          drawArc(e, ctx);
        }
      });
      myCanvas.addEventListener("touchend", function () {
        flag = false;
        calcArea(ctx);
      });
    });
    console.log(props);
    const hideMask = () => {
      context.emit("hideScale");
    };
    return {
      hideMask,
    };
  },
};
</script>

<style scoped>
.scale {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scaleItem {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.canvasWrap {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
}
#canvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
}
.content {
  width: 200px;
  height: 80px;
  background-color: #e9d78d;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
}
.scale img {
  width: 80%;
  border-radius: 8px;
  height: 10rem;
}
</style>