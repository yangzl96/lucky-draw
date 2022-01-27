<template>
  <div v-if="!isNext" class="firstCover">
    <div class="gif1">来摸鱼 ~</div>
    <img class="gif2" src="../assets/15.gif" alt="" @click="jumpPackage" />
    <div class="toNext" @click="handleNext"></div>
    <img v-show="showCenter" class="centerImg" src="../assets/14.gif" alt="" />
  </div>
  <div v-else class="luckyWrap">
    <div class="title">
      <h2>幸运小转盘</h2>
      <h2>红包送暖意</h2>
    </div>
    <LuckyWheel
      ref="myLucky"
      width="4.6rem"
      height="4.6rem"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
    />
    <div class="seeReward">
      <div @click="showRewards">抽奖记录</div>
    </div>
    <toast
      v-if="showToast"
      @closeToast="closeToast"
      :msg="toastMsg"
      :showHeader="showHeader"
    ></toast>
    <bottom-sheet v-if="showSheet" @closeSheet="closeSheet"></bottom-sheet>
    <div v-show="showText" class="chance" @click="getChance">再来一次</div>
    <div class="mask BigReward" v-if="isBigReward">
      <img src="../assets/12.gif" alt="" />
    </div>
  </div>
</template>

<script>
import { toRaw, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Toast from '../components/toast.vue'
import BottomSheet from '../components/bottomsheet.vue'
const drawBg = require('../assets/bg.png')
const jb = require('../assets/jb.png')
const kz = require('../assets/kz.png')
const yf = require('../assets/yf.png')
const xz = require('../assets/xz.png')
const jb_m = require('../assets/jb_m.png')
const jb_l = require('../assets/jb_l.png')
const kh = require('../assets/kh.png')
export default {
  name: 'home',
  components: {
    Toast,
    BottomSheet,
  },
  setup() {
    // 路由
    const router = useRouter()
    // toast header
    let showHeader = ref(true)
    // 大奖
    let isBigReward = ref(false)
    // 再来一次
    let showText = ref(false)
    // 奖品名称
    let toastMsg = ref('')
    // 抽奖次数
    let count = ref(3)
    // 中间的图片
    let showCenter = ref(false)
    // 进入抽奖页
    let isNext = ref(false)
    // 实例
    const myLucky = ref()
    // 弹窗
    let showToast = ref(false)
    // 奖品列表
    let rewardsList = reactive([])
    // 底部sheet
    let showSheet = ref(false)
    onMounted(() => {
      localStorage.setItem('chance', 0)
      count.value = localStorage.getItem('count') || 3
      console.log(count.value)
      rewardsList = JSON.parse(localStorage.getItem('rewardsList')) || []
      console.log(rewardsList)
    })
    // 配置项
    const blocks = reactive([
      {
        padding: '13px',
        imgs: [
          {
            src: drawBg,
            width: '100%',
            height: '100%',
          },
        ],
      },
    ])
    const prizes = reactive([
      {
        range: 10,
        text: '美衣一件',
        background: '#FFEAB1',
        imgs: [
          {
            src: yf,
            width: '60%',
            top: '10%',
          },
        ],
      },
      {
        range: 15,
        text: '口红一支',
        background: '#FFFFFF',
        imgs: [
          {
            src: kh,
            width: '50%',
            top: '15%',
          },
        ],
      },
      {
        text: '美裤一条',
        range: 12,
        background: '#FFEAB1',
        imgs: [
          {
            src: kz,
            width: '50%',
            top: '15%',
          },
        ],
      },
      {
        text: '￥333',
        range: 20,
        fonts: [
          {
            text: '￥333',
            top: '10%',
            fontSize: 14,
            fontColor: '#DC101E',
            fontWeight: 600,
          },
        ],
        background: '#FFFFFF',
        imgs: [
          {
            src: jb,
            width: '40%',
            top: '20%',
          },
        ],
      },
      {
        text: '美鞋一双',
        range: 10,
        background: '#FFEAB1',
        imgs: [
          {
            src: xz,
            width: '50%',
            top: '15%',
          },
        ],
      },
      {
        text: '￥777',
        range: 6,
        fonts: [
          {
            text: '￥777',
            top: '10%',
            fontSize: 14,
            fontColor: '#DC101E',
            fontWeight: 600,
          },
        ],
        background: '#FFFFFF',
        imgs: [
          {
            src: jb_m,
            width: '60%',
            top: '10%',
          },
        ],
      },
      {
        text: '￥555',
        range: 10,
        fonts: [
          {
            text: '￥555',
            top: '10%',
            fontSize: 14,
            fontColor: '#DC101E',
            fontWeight: 600,
          },
        ],
        background: '#FFEAB1',
        imgs: [
          {
            src: jb,
            width: '40%',
            top: '20%',
          },
        ],
      },
      {
        text: '￥888',
        range: 5,
        fonts: [
          {
            text: '￥888',
            top: '10%',
            fontSize: 14,
            fontColor: '#DC101E',
            fontWeight: 600,
          },
        ],
        background: '#FFFFFF',
        imgs: [
          {
            src: jb_l,
            width: '60%',
            top: '10%',
          },
        ],
      },
      {
        text: '￥666',
        range: 8,
        fonts: [
          {
            text: '￥666',
            top: '10%',
            fontSize: 14,
            fontColor: '#DC101E',
            fontWeight: 600,
          },
        ],
        background: '#FFEAB1',
        imgs: [
          {
            src: jb_m,
            width: '60%',
            top: '10%',
          },
        ],
      },
      {
        text: '￥999',
        range: 5,
        fonts: [
          {
            text: '￥999',
            top: '10%',
            fontSize: 14,
            fontColor: '#DC101E',
            fontWeight: 600,
          },
        ],
        background: '#FFFFFF',
        imgs: [
          {
            src: jb_l,
            width: '60%',
            top: '10%',
          },
        ],
      },
    ])
    const buttons = reactive([
      { radius: '50px', background: 'rgba(228,17,32,.7)' },
      { radius: '45px', background: '#FFFFFF' },
      {
        radius: '30px',
        background: '#FEAF1A',
        pointer: true,
        fonts: [{ text: '开心\n抽米', top: '-20px', fontColor: '#FFFFFF' }],
      },
    ])
    const startCallback = () => {
      showHeader.value = true
      if (count.value == 0 || count.value == -1) {
        showToast.value = true
        localStorage.setItem('count', -1)
        toastMsg.value = '你真坏！已经没有次数了！'
        const chance = localStorage.getItem('chance')
        showText.value = chance == 1 ? false : true
        return
      }
      // 调用抽奖组件的play方法开始游戏
      myLucky.value.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        // const index = 0
        // 调用stop停止旋转并传递中奖索引
        // myLucky.value.stop(index)
        myLucky.value.stop()
      }, 300)
      count.value -= 1
      localStorage.setItem('count', count.value)
    }
    const endCallback = (prize) => {
      const prizeData = toRaw(prize)
      const text = prizeData.text
      toastMsg.value = text
      if (text == '￥888' || text == '￥999') {
        isBigReward.value = true
        setTimeout(() => {
          isBigReward.value = false
          showToast.value = true
        }, 2500)
      } else {
        showToast.value = true
      }
      rewardsList.push(prizeData)
      localStorage.setItem('rewardsList', JSON.stringify(rewardsList))
    }
    // 关闭弹窗
    const closeToast = () => {
      showToast.value = false
    }
    // 关闭底部sheet
    const closeSheet = () => {
      showSheet.value = false
    }
    const showRewards = () => {
      showSheet.value = true
    }
    // 下一步
    const handleNext = () => {
      showCenter.value = true
      setTimeout(() => {
        isNext.value = true
      }, 2200)
    }
    // 给个机会
    const getChance = () => {
      showText.value = false
      localStorage.clear()
      // localStorage.setItem('chance', 1)
      localStorage.setItem('chance', 0)
      localStorage.setItem('count', 3)
      localStorage.setItem('rewardsList', JSON.stringify([]))
      count.value = 3
      rewardsList = []
      toastMsg.value = '好运值 + 10'
      showToast.value = true
      showHeader.value = false
    }
    const jumpPackage = () => {
      router.push('/package')
    }
    return {
      jumpPackage,
      showHeader,
      isBigReward,
      showText,
      count,
      toastMsg,
      isNext,
      showCenter,
      myLucky,
      blocks,
      prizes,
      buttons,
      startCallback,
      handleNext,
      endCallback,
      getChance,
      showToast,
      closeToast,
      showSheet,
      closeSheet,
      showRewards,
    }
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.firstCover {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/f18.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: perspective(400px);
  -webkit-transform: perspective(400px);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.firstCover .gif1 {
  position: absolute;
  padding: 0.3rem;
  width: 80%;
  height: 1.6rem;
  top: 0;
  left: 0;
  font-size: 26px;
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-20%, 0);
}
.firstCover .toNext {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  padding: 0.8rem;
  /* background-color: beige; */
}
.firstCover .gif2 {
  position: absolute;
  bottom: 0;
  width: 5rem;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  animation: tiggerCenter 2s linear;
  -webkit-animation: tiggerCenter 2s linear;
}
.firstCover .centerImg {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 5rem;
  transform: translate(-50%, -50%);
}
@-webkit-keyframes tiggerCenter {
  0% {
    transform: translateX(0%);
    -webkit-transform: translateX(0%);
  }
  25% {
    transform: translateX(-12.5%);
    -webkit-transform: translateX(-12.5%);
  }
  50% {
    transform: translateX(-25%);
    -webkit-transform: translateX(-25%);
  }
  75% {
    transform: translateX(-37.5%);
    -webkit-transform: translateX(-37.5%);
  }
  100% {
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
  }
}
.BigReward {
  display: flex;
  align-items: center;
  justify-content: center;
}
.BigReward img {
  height: 52%;
}
.chance {
  position: absolute;
  bottom: 0.1rem;
  right: 0.3rem;
  font-size: 12px;
  color: #000;
  /* color: rgba(209, 18, 33, 1); */
}
.luckyWrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/3.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.title {
  position: absolute;
  top: 2rem;
  left: 50%;
  color: #fff;
  transform: translateX(-50%);
}
.title h2 {
  margin-top: 0;
  letter-spacing: 2pt;
  font-size: 24px;
  margin-bottom: 0;
  /* margin-bottom: 0.1rem; */
}
#app {
  position: relative;
  height: 100%;
  width: 100%;
}
.seeReward {
  position: absolute;
  bottom: 2.8rem;
  width: 2rem;
  height: 0.6rem;
  text-align: center;
  font-size: 14px;
  line-height: 0.6rem;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  background-color: #feaf1a;
}
</style>
