<template>
  <div class="mainContent">
      <top-bar/>
      <div class="d-flex justify-space-between p-20 flex-wrap">
        <!--左側填單-->
        <div class="left-content">
          <div class="my-5 w450">
            <h2 class="d-flex align-center"><v-icon icon="mdi-numeric-1-circle mr-1"></v-icon>請新增成員</h2>
            <div class="d-flex align-center mt-3">
              <v-text-field
                  v-model="addNewMember"
                  variant="outlined"
                  hide-details
                  class="addNewMember"
                  @keyup.enter="addNewMemberBtn"
              ></v-text-field>
              <v-btn color="success" class="ml-3" size="x-large" @click="addNewMemberBtn">新增</v-btn>
            </div>
          </div>

          <!--目前成員-->
          <div class="w450">
            <h3 class="text-orange-darken-3 text-left">目前成員： {{memberList.length}} 位</h3>
            <div class="d-flex justify-start flex-wrap">
              <div v-for="(member,idx) in memberList" :key="idx" class="member">
                  <div class="text-center">
                    <div class="mem_icon" :style="`background:${showNowColor(idx)}`">
                      {{member.split('')[0]}}
                      <v-icon icon="mdi-close-circle" class="del_member" color="red-darken-3" @click="delMember(idx)"></v-icon>
                    </div>
                    <div class="mem_name">{{member}}</div>
                  </div>
              </div>
            </div>
          </div>

          <div class="w450" v-if="memberList.length">
            <!--填寫均分項目-->
            <div class="mt-6">
              <h2 class="d-flex align-center"><v-icon icon="mdi-numeric-2-circle mr-1"></v-icon>請填入均分項目</h2>
              <div class="d-flex align-center mt-3">
                <v-text-field
                    v-model="addNewItem"
                    variant="outlined"
                    hide-details
                    class="addNewItem"
                    placeholder="格式：項目名稱$金額"
                    @keyup.enter="addNewItemBtn"
                ></v-text-field>
                <v-btn color="success" class="ml-3" size="x-large" @click="addNewItemBtn">新增</v-btn>
              </div>
            </div>
          </div>

          <!--填寫獨立項目-->
          <div class="my-8 w450" v-if="memberList.length">
            <h2 class="d-flex align-center">
              <v-icon icon="mdi-numeric-3-circle mr-1"></v-icon>
              請填入獨立項目及成員
            </h2>
            <div class="mt-3">
              <div class="d-flex align-items">
                <v-text-field
                    v-model="addOtherItem"
                    variant="outlined"
                    hide-details
                    class="addNewItem my-3"
                    placeholder="格式：項目名稱$金額"
                    @keyup.enter="addOtherItemBtn"
                ></v-text-field>
                <v-btn color="success" class="ml-3" size="x-large" @click="addOtherItemBtn">新增</v-btn>
              </div>
              <v-chip-group multiple selected-class="text-primary" v-model="otherItemMember">
                <v-chip v-for="tag in memberList" :key="tag" filter :value="tag" >{{ tag }}</v-chip>
              </v-chip-group>
            </div>
          </div>
          <!--計算各自金額-->
          <div class="my-8 w450" v-if="itemList.length || otherList.length">
            <h2 class="d-flex align-center">
              <v-icon icon="mdi-numeric-4-circle mr-1"></v-icon>
              成員應付金額
            </h2>
            <div class="mt-3">
              <div class="d-flex align-center justify-space-between" v-for="(member,idx) in memberList" :key="idx">
                <div  class="d-flex align-center jsutify-content">
                  <div class="mem_icon ml-0 mr-3" :style="`background:${showNowColor(idx)}`">{{member.split('')[0]}}</div>
                  <div class="mem_name">{{member}}</div>
                </div>
                <div class="d-flex align-end">NT$<div class="text-red-darken-3 w100 text-right">{{countMemberCost(member)}}</div></div>
              </div>
            </div>
          </div>
        </div>

        <!--右側明細-->
        <div class="right-content">
          <div class="my-5">
            <div class="text-right"  v-if="itemList.length || otherList.length">
              <h2>項目總金額：<span class="text-red-darken-3">{{itemTotal}}</span></h2>
            </div>
            <!--均分項目-->
            <div  v-if="itemList.length">
              <div class="d-flex justify-space-between">
                <h2 class="d-flex align-center"><v-icon icon="mdi-cat mr-1"></v-icon>均分項目</h2>
              </div>
              <v-table class="mt-2">
                <thead>
                  <tr>
                    <th class="text-left">
                      品項名稱
                    </th>
                    <th class="text-right">
                      單價(NT)
                    </th>
                    <th class="text-center">
                      刪除
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,idx) in itemList"
                    :key="idx"
                  >
                    <td class="item_name text-left">{{ item.itemName }}</td>
                    <td class="text-right item_price">{{ item.itemPrice }}</td>
                    <td class="text-center item_delete"><v-icon icon="mdi-close-circle" color="red-darken-3" @click="delItem(idx,'1')"></v-icon></td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <!--獨立項目-->
            <div v-if="otherList.length" class="mt-3">
              <h2 class="d-flex align-center"><v-icon icon="mdi-cat mr-1"></v-icon>獨立項目</h2>
              <v-table class="mt-2" >
                <thead>
                  <tr>
                    <th class="text-left">
                      品項名稱
                    </th>
                     <th class="text-right">
                      數量
                    </th>
                    <th class="text-right">
                      單價(NT)
                    </th>
                    <th class="text-center">
                      刪除
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,idx) in otherList"
                    :key="idx"
                  >
                    <td class="item_name">
                      {{ item.itemName }}<br>
                        <v-chip v-for="(tag,idx) in item.itemMember" :key="idx" :style="`background:${showNowColor(memberList.indexOf(tag))};color:white;margin:10px 10px 0 0;`">{{ tag }}</v-chip>
                    </td>
                    <td class="text-right item_count">{{ item.itemMember.length }}</td>
                    <td class="text-right item_price">{{ item.itemPrice }}</td>
                    <td class="text-center item_delete"><v-icon icon="mdi-close-circle" color="red-darken-3" @click="delItem(idx,'2')"></v-icon></td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </div>
      </div>

      <!--提示訊息-->
      <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-text>{{showMsg}}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">關閉</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </div>
</template>

<script setup>
import {ref,computed,watch, onUpdated} from 'vue'
import topBar from './topBar.vue';

//接收父組件參數
let props = defineProps({
  step:{
    type:Number,
    default: 1
  }
})

//宣告Data變數
const addNewMember = ref('');
const memberList = ref([]);
const addNewItem = ref('');
const addOtherItem = ref('');
const itemList = ref([]);
const otherList = ref([]);
const otherItemMember = ref([]);
const colorList = ref(['#EF5350','#FFA726','#66BB6A','#0288D1','#7B1FA2','#6D4C41','#37474F','#00E5FF','#C2185B','#AFB42B','#0097A7','#B39DDB','#F06292','#FFAB91','#004D40']); // eslint-disable-line no-unused-vars
const showMsg = ref('');
const dialog = ref(false);
const storeDelName = ref('');

const charleyHellow = computed(()=>{
  return myname.value == 'charley' ? 'hi charley' : 'bye bye!'
})

//新增成員
const addNewMemberBtn = ()=>{
  if(addNewMember.value.trim() == ''){
    showMsg.value = '請輸入成員名稱';
    dialog.value = true;
  }else if(memberList.value.indexOf(addNewMember.value) > -1){
    showMsg.value = '成員裡面已經有這位了喔';
    dialog.value = true;
  }else{
    memberList.value.push(addNewMember.value);
  }
  addNewMember.value = '';
}

//新增均分項目
const addNewItemBtn = ()=> {
  if(addNewItem.value.trim() == ''){
    showMsg.value = '請輸入項目名稱';
    dialog.value = true;
  }else if(checkInput(addNewItem.value)){
    let item = {
      itemName:addNewItem.value.split('$')[0],
      itemPrice:addNewItem.value.split('$')[1]
    }
    itemList.value.push(item);
    addNewItem.value = '';
  }else{
    showMsg.value = ' 請確認輸入格式 ex:項目名稱$100 ';
    dialog.value = true;
  }
}

//新增獨立項目
const addOtherItemBtn = () => {
  if(addOtherItem.value.trim() == ''){
    showMsg.value = '請輸入項目名稱';
    dialog.value = true;
  }else if(!otherItemMember.value.length){
    showMsg.value = '請選擇成員';
    dialog.value = true;
  }else if(checkInput(addOtherItem.value)){
    let otherItem = {
      itemName:addOtherItem.value.split('$')[0],
      itemPrice:addOtherItem.value.split('$')[1],
      itemMember:otherItemMember.value
    }
    otherList.value.push(otherItem);
    addOtherItem.value = '';
    otherItemMember.value = [];
  }else{
    showMsg.value = ' 請確認輸入格式 ex:項目名稱$100 ';
    dialog.value = true;
  }
}

//計算均分項目總金額
const itemTotal = computed(() => {
  let total_price = 0;
  //共同項目
  itemList.value.forEach((x) => {
    total_price += Number(x.itemPrice);
  });
  //獨立項目
  otherList.value.forEach((y) => {
    let other_price = (Number(y.itemPrice) * 1000 * y.itemMember.length) / 1000;
    total_price += other_price;
  });

  return total_price;
});

//計算成員各自花費
const countMemberCost = (member) => {
  let cost = 0;
  let public_total = 0;
  
  //共同項目
  itemList.value.forEach((x) => {
    public_total += Number(x.itemPrice);
  });
  cost += public_total / memberList.value.length;

  //獨立項目
  otherList.value.forEach((y) => {
    if(y.itemMember.indexOf(member) > -1){
      cost +=  Number(y.itemPrice);
    }
  });
  return cost;
}

//檢查輸入格式
const checkInput = (str) => {
  const reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,}\$[\d]{1,}$/;
  return reg.test(str);
}

//計算成員顏色
const showNowColor = (idx) => {
  if(idx < colorList.value.length){
    return colorList.value[idx];
  }else{
    return colorList.value[idx - colorList.value.length];
  }
};

//移除成員
const delMember = (idx) => {
  if(memberList.value[idx]){
    storeDelName.value = memberList.value[idx];
  }
  memberList.value.splice(idx,1);
  otherList.value.forEach( (r) => {
    if(r.itemMember.indexOf(storeDelName.value) > -1){
      r.itemMember.splice(r.itemMember.indexOf(storeDelName.value),1);
    }
  });

  otherList.value.forEach( (r,index) => {
    if(!r.itemMember.length){
      otherList.value.splice(index,1);
    }
  });

}

//移除項目 1|均分項目 2|獨立項目
const delItem = (idx,type) => {
  switch(type){
    case "1":
      itemList.value.splice(idx,1);
      break;
    case "2":
      otherList.value.splice(idx,1);
      break;
  }
}

</script>

<style lang="scss" scoped>
  h2{
    color:#4E342E;
  }

  .w450{
    width:100%;
    max-width:450px;
  }

  .mainContent{
    min-height: calc(100vh - 60px - 60px);
  }

  .left-content{
    width:100%;
    max-width:450px;
  }

  .right-content{
    width:100%;
    max-width:800px;
  }
    
  :deep(.addNewMember), :deep(.addNewItem){
    display: contents;
    width:342px;
    .v-input__control{
      width:342px;
    }
  }

  .member{
    width:80px;
    margin:5px 10px 0 0;
  }

  .mem_icon{
    width:30px;
    height:30px;
    margin:10px auto;
    border-radius:50%;
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mem_name{
    word-break:break-all;
  }

  :deep(.v-table .v-table__wrapper){
    border-radius:5px;
    border:1px solid #FFCC80;
    
    thead{
      background:#FFCC80;
      th{
        color:#6D4C41;
        font-size:18px;
        word-break:break-all;
      }
      
    }

    td{
      border:1px solid #FFCC80;
      word-break:break-all;
      padding:15px;
    }

    .item_count{
      width:100px;
    }

    .item_price{
      width:150px;
    }

    .item_delete{
      width:100px;
    }

  }

  .w100{
    width:100px;
  }

  .del_member{
    position: absolute;
    margin-top:-30px;
    margin-left:45px;
    cursor:pointer;
  }

  .p-20{
    padding:0 20px;
  }
</style>
