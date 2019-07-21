<template>
  <div class="container center-content">
    <div class="bb">
      bbbb
    </div>
    <RouterView />
  </div>
</template>

<style  lang="less"  scoped>
@import './index.less';
.container{
  background-color: red;
  .bb {
    background-color:@icolor;
  }
}
</style>

