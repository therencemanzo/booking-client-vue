<template>
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <router-link to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </router-link>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <router-link to="/book" class="text-sm/6 font-semibold text-gray-900" v-if="authStore.isAuthenticated">Dashboard</router-link>
          <router-link to="/bookings" class="text-sm/6 font-semibold text-gray-900" v-if="authStore.isAuthenticated">My Bookings</router-link>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <router-link to="/login" class="text-sm/6 font-semibold text-gray-900"  v-if="!authStore.isAuthenticated">Log in <span aria-hidden="true">&rarr;</span></router-link>
          <a href="/login" class="text-sm/6 font-semibold text-gray-900"  v-if="authStore.isAuthenticated" @click.prevent="handleLogout">Logout<span aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
      
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
              </div>
              <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
</template>
<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth';
import api from '../axios';
import { useRouter } from 'vue-router';
import ToastNotification from './ToastNotification.vue';

const authStore = useAuthStore();
const router = useRouter();

const mobileMenuOpen = ref(false)

const handleLogout = async() => {

  await api.post('/logout');

 authStore.logout();

 router.push('/');

}
</script>