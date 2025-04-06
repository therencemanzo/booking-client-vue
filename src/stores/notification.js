import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotficationStore = defineStore('notification', () => {

  const notification = ref('')

  function setNotifiction(message) {
    notification.value = message

    setTimeout(()=>{
        notification.value = '';
    }, 5000)
  }

  return { notification, setNotifiction }
})