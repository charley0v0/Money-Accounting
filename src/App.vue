<template>
  <div class="main">
    <MainCoutent />
    <div class="footer text-white">Copytight 2023 © Charley</div>
  </div>
</template>

<script type="text/javascript">

</script>

<script setup>

  import {reactive, ref, watch, provide } from 'vue'
  import MainCoutent from './components/MainCoutent.vue';

</script>

<style lang="scss">
  *{
    // border:1px solid red;
  }

  #app{
    min-height:100vh;
    box-sizing:border-box;
    background:#ffcc80;
  }

  .main{
    background:#FFFFFF;
    min-height:calc(100vh - 60px);
    border-radius:25px;
    padding:0px;
  }

  .footer{
    padding:20px;
    border-radius:0 0 20px 20px;
    text-align:center;
    background:#4E342E;
    color:white;
    height:60px;
  }

</style>
