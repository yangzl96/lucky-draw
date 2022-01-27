<template>
  <div class="package">
    <h2>你好精，那就抽一张吧</h2>
    <div class="packageList">
      <div class="packageItem"></div>
    </div>
  </div>
</template>

<script>
export default {}
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
  transform: perspective(400px);
  -webkit-transform: perspective(400px);
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-backface-visibility: hidden;
}
h2 {
  position: absolute;
  top: 2rem;
  font-size: 20px;
  color: #fff;
}
.packageList {
  margin: 0.2rem;
  width: 100%;
  height: 8rem;
  border: 1px solid #000;
}
</style>
