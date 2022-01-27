<template>
  <div class="mask" @click="handleHideSheet">
    <div class="bottomSheet" @click.stop="() => {}">
      <h2>你的米</h2>
      <div class="rewardList">
        <div
          class="rewardItem"
          v-for="(item, index) in rewardsList"
          :key="index"
        >
          <img src="../assets/lp.png" alt="" />
          <span>{{ item.text }} x1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, context) {
    const handleHideSheet = () => {
      context.emit('closeSheet')
    }
    let rewardsList = JSON.parse(localStorage.getItem('rewardsList')) || []
    return {
      rewardsList,
      handleHideSheet,
    }
  },
}
</script>

<style scoped>
.bottomSheet {
  position: fixed;
  height: 6.6rem;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  padding: 0.2rem;
  box-sizing: border-box;
  background-color: #fff;
  animation: sharePath 0.5s;
  animation-fill-mode: forwards;
  transform: translateY(0);
  background-image: url(~@/assets/f19.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.rewardList {
  overflow: auto;
  margin-top: 0.3rem;
  padding-bottom: .2rem;
  height: 100%;
}
.rewardItem {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
  margin-bottom: 0.2rem;
}
.rewardItem img {
  margin-right: 0.3rem;
  width: 0.6rem;
}
h2 {
  text-align: center;
  margin: 0;
  font-size: 20px;
  color: #feaf1a;
}

@keyframes sharePath {
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
