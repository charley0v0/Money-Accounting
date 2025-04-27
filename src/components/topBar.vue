<template>
    <div class="toolbar">
        <img src="../assets/img/main.png" class="logo">
        <div class="text-left">
            <h1 class="mb-3"><i class="fi fi-sr-paw mr-2"></i>
                {{myName}}的記帳小工具
            </h1>
            <h3>每次聚餐吃飯玩樂要分錢總是算到腦袋放空嗎？</h3>
            <h3>讓{{myStore.setNewName}}來幫你算吧！</h3>         
        </div>
    </div>
</template>

<script setup>
import {usersStore} from '../store/user'
import {storeToRefs} from 'pinia'
const myStore = usersStore()
const {myName} = storeToRefs(myStore)

</script>

<style lang="scss" scoped>

    .toolbar{
        display:flex;
        align-items:center;
        flex-wrap: wrap;
        padding:20px;
        .logo{
            width:auto;
            height:150px;
            border-radius:25px;
            margin-right:20px;
            margin-bottom:20px;
            border:3px solid #8D6E63;
        }

        h1{
            font-size:32px;
            color:#4E342E;
        }

        h3{
            color:#A1887F;
        }
    }
    
</style>
