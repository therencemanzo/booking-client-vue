<template>
  <div class="bg-white relative">
    <Header />
    <ToastNotification />
    <div class="relative isolate px-6 pt-14 lg:px-8 max-2xl:mx-auto">
      <router-view />
    </div>
   
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import Header from './components/Header.vue'
import ToastNotification from './components/ToastNotification.vue'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const mobileMenuOpen = ref(false)
</script>