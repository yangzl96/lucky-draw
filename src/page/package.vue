<template>
  <div class="package">
    <div class="header">
      <div @click="goBack">back</div>
    </div>
    <h2>我好烦，你又来收米！</h2>
    <div class="packageList">
      <div
        class="packageItem"
        :class="animationClass(index)"
        @click="changeSide(item, index)"
        v-for="(item, index) in packageList"
        :key="index"
      >
        <img :src="item.cover ? cover : back" alt="" />
        <span class="moneyText" v-if="showRecord">{{ item.money }}</span>
      </div>
    </div>
    <div v-if="showRecord" class="moneyList">
      <div class="moneyItem" v-for="(item, index) in moneyList" :key="index">
        <div>第{{ index + 1 }}抽次的米：{{ item }}</div>
      </div>
    </div>
  </div>
  <transition name="fade">
    <scale
      v-if="showScale"
      @hideScale="hideScale"
      :money="currentMoney"
    ></scale>
  </transition>
  <toast
    v-if="showToast"
    :msg="toastMsg"
    :showHeader="false"
    @closeToast="closeToast"
  ></toast>
</template>

<script>
const hb1 = require("../assets/hb1.png");
const hb2 = require("../assets/hb2.png");
import Scale from "../components/scale.vue";
import Toast from "../components/toast.vue";
import { useRouter } from "vue-router";
import { reactive, ref, onMounted, computed } from "vue";
export default {
  components: {
    Scale,
    Toast,
  },
  setup() {
    const router = useRouter();
    let moneyList = JSON.parse(localStorage.getItem("moneyList")) || [];
    let showToast = ref(false);
    let toastMsg = ref("");
    let showRecord = ref(false);
    let clickCount = ref(0);
    let cover = hb1;
    let back = hb2;
    let current = ref(-1);
    let showScale = ref(false);
    let packageList = reactive([
      {
        money: "￥20",
        cover: true,
      },
      {
        money: "￥100",
        cover: true,
      },
      {
        money: "￥88",
        cover: true,
      },
      {
        money: "￥55",
        cover: true,
      },
      {
        money: "￥6.6",
        cover: true,
      },
      {
        money: "￥66",
        cover: true,
      },
      {
        money: "￥520",
        cover: true,
      },
      {
        money: "￥18",
        cover: true,
      },
      {
        money: "￥77",
        cover: true,
      },
    ]);
    // 影藏弹窗
    const hideScale = () => {
      if (clickCount.value === 2) {
        setTimeout(() => {
          packageList.forEach((item) => {
            item.cover = false;
          });
        }, 1600);
        showRecord.value = true;
      }
      showScale.value = false;
    };
    // 点击红包
    const changeSide = (item, index) => {
      if (clickCount.value === 2) {
        toastMsg.value = "真的没有机会了！";
        showToast.value = true;
        return;
      }
      if (item.cover) {
        setTimeout(() => {
          item.cover = false;
        }, 600);
        setTimeout(() => {
          showScale.value = true;
        }, 1200);
        current.value = index;
        clickCount.value += 1;
        localStorage.setItem("clickCount", clickCount.value);
        moneyList.push(currentMoney.value);
        localStorage.setItem("moneyList", JSON.stringify(moneyList));
      }
    };
    // 关闭
    const closeToast = () => {
      showToast.value = false;
    };
    // 返回
    const goBack = () => {
      router.go(-1);
    };
    // 动画class
    const animationClass = (index) => {
      // if (clickCount.value === 3) {
      //   return "imgAnimation";
      // }
      return current.value === index ? "imgAnimation" : "";
    };
    const currentMoney = computed(() => {
      return packageList[current.value].money;
    });
    onMounted(() => {
      clickCount.value = parseInt(localStorage.getItem("clickCount")) || 0;
      showRecord.value = clickCount.value == 2;
      if (clickCount.value == 2) {
        packageList.forEach((item) => {
          item.cover = false;
        });
      }
      // localStorage.removeItem('clickCount')
      // localStorage.removeItem('moneyList')
    });
    return {
      showRecord,
      moneyList,
      showToast,
      toastMsg,
      showScale,
      current,
      cover,
      back,
      packageList,
      clickCount,
      currentMoney,
      animationClass,
      goBack,
      closeToast,
      hideScale,
      changeSide,
    };
  },
};
</script>

<style scoped>
.package {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/2.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
h2 {
  position: absolute;
  top: .6rem;
  font-size: 20px;
  color: #fff;
}
.header {
  font-size: 14px;
  color: #fff;
  position: absolute;
  top: 0.15rem;
  left: 0.15rem;
  border-radius: 4px;
  padding: 0.03rem 0.12rem;
  background-color: rgba(255, 255, 255, 0.5);
}
.packageList {
  margin: 0.2rem;
  width: 100%;
  /* border: 1px solid #000; */
  display: flex;
  flex-wrap: wrap;
  perspective: 800px;
  -webkit-perspective: 800px;
  justify-content: space-between;
  transform-style: preserve-3d; /* 动画方式 3d */
  -webkit-transform-style: preserve-3d;
}
.moneyList {
  margin: 0.2rem;
  height: 2rem;
  width: 100%;
  position: absolute;
  bottom: .4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.moneyItem {
  font-size: 14px;
  color: #fff;
}
.packageItem {
  position: relative;
  width: 30%;
  height: 2.5rem;
  margin-bottom: 0.2rem;
}
.moneyText {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: #fff;
}
.packageItem img {
  border-radius: 4px;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: rotate3d(0.5, 0.5, 0.5, 0);
  -webkit-transform: rotate3d(0.5, 0.5, 0.5, 0);
}
.imgAnimation {
  animation: roateImg 1s linear;
  -webkit-animation: roateImg 1s linear;
}
@keyframes roateImg {
  0% {
    transform: rotate3d(0.2, 0.2, 0.3, 0);
  }
  25% {
    transform: rotate3d(0.5, 0.5, 0.5, 50deg);
  }
  50% {
    transform: rotate3d(0.7, 0.7, 0.7, 90deg);
  }
  75% {
    transform: rotate3d(0.8, 0.8, 0.8, 140deg);
  }
  100% {
    transform: rotate3d(1, 1, 1, 180deg);
  }
}
@-webkit-keyframes roateImg {
  0% {
    transform: rotate3d(0.2, 0.2, 0.3, 0);
  }
  25% {
    transform: rotate3d(0.5, 0.5, 0.5, 50deg);
  }
  50% {
    transform: rotate3d(0.7, 0.7, 0.7, 90deg);
  }
  75% {
    transform: rotate3d(0.8, 0.8, 0.8, 140deg);
  }
  100% {
    transform: rotate3d(1, 1, 1, 180deg);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

