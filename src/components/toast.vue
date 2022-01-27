<template>
  <div class="mask">
    <div class="toastInfo">
      <h3 v-if="showHeader">{{ getTitle }}</h3>
      <p v-if="showHeader">
        <span v-if="count >= 0">我的天，你抽中了</span>
        <span class="reward">{{ msg }}</span>
      </p>
      <p v-else style="text-align: center">
        <span class="reward">{{ msg }}</span>
      </p>
      <div v-if="count >= 0" class="toastBtn" @click="handleHideToast">
        开心收下 ~
      </div>
      <div v-else class="toastBtn" @click="handleHideToast">狠心离开 ~</div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    let count = ref(0)
    onMounted(() => {
      count.value = localStorage.getItem('count')
    })
    const getTitle = computed(() => {
      switch (props.msg) {
        case '美鞋一双':
          return '这就去淘宝！'
        case '美衣一件':
          return '这就去淘宝！'
        case '美裤一条':
          return '这就去淘宝！'
        case '口红一支':
          return '这就去淘宝!'
        case '￥333':
          return '真不错呢!'
        case '￥555':
          return '运气爆棚了!'
        case '￥666':
          return '仙女下凡了？'
        case '￥777':
          return '仙女下凡了？'
        case '￥888':
          return '哥哥完蛋了'
        case '￥999':
          return '哥哥完蛋了'
        default:
          return '明年再来吧'
      }
    })
    const handleHideToast = () => {
      context.emit('closeToast')
    }
    return {
      count,
      getTitle,
      handleHideToast,
    }
  },
}
</script>

<style scoped>
.toastMask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.toastInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.4rem 0.3rem;
  width: 4rem;
  height: 2rem;
  background-color: #fff;
  color: #000;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
}
.toastInfo h3 {
  text-align: center;
  margin: 0;
  font-size: 20px;
}
.toastInfo p {
  text-align: justify;
  margin-top: 0.2rem;
  font-size: 16px;
}
.reward {
  color: #df111f;
}
.toastBtn {
  margin: 0 auto;
  width: 68%;
  padding: 0.1rem 0;
  border-radius: 4px;
  color: #fff;
  background-color: #feaf1a;
  text-align: center;
  font-size: 14px;
}
</style>
