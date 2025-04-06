import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const isAuthenticated = ref(localStorage.getItem('token') ? true : false)

  const login = async (email, password) => {

    try{

      let response = await api.post('/login', {
        email,
        password
      });

      isAuthenticated.value = true;
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      api.interceptors.request.use(config => {
          const token = localStorage.getItem('token');
          if (token) {
              config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
      });
      
      return true;

    }catch(e){
      console.log(e);
    }finally{
      console.log('finally');
    }

    
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return { user, isAuthenticated, login, logout }
})