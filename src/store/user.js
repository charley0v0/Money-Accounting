import {defineStore} from 'pinia'

// 第一個參數是store裡的唯一值id
export const usersStore = defineStore('users', {
    //相當於vue中的data
    state: () => {
        return {
          myName: "查理",
        };
    },
    //相當於vue中的compute
    getters: {
        setNewName: (state) => {
            return state.myName == '查理' ? '小查理' : '查理';
        }
    },
    //相當於vue中的methods
    action: {

    }
  })