<script setup>
import { CheckIcon } from '@heroicons/vue/20/solid'
import { onMounted, ref } from 'vue';
import api from '../axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const prices = ref(null);

const handleBook = () => {
  router.push('/book')
}

onMounted(async() => {

  try{
    let response  = await api.get('/get-prices');

    prices.value  = response.data.data;

  }catch{

  }


})
</script>


<template>
    <div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
        <div class="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base/7 font-semibold text-indigo-600">Pricing</h2>
        <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">Choose the right Parking for you</p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p>
      <div class="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-2 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl" v-if="prices">
        <div v-for="(price, priceIdx) in prices" :key="price.id" :class="[price.current ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0', 'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10']">
          <h3 :id="price.id" :class="[price.current ? 'text-indigo-400' : 'text-indigo-600', 'text-base/7 font-semibold']">{{ price.title }}</h3>
          <ul role="list" :class="[price.current ? 'text-gray-300' : 'text-gray-600', 'mt-8 space-y-3 text-sm/6 sm:mt-10']">
            <li v-for="dailyPrice in price.daily_prices" :key="dailyPrice.day" class="flex gap-x-3 capitalize">
              <CheckIcon :class="[price.current ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none ']" aria-hidden="true" />
              {{ dailyPrice.day }} - {{ dailyPrice.price }}
            </li>
          </ul>
          <a href="" @click.prevent="handleBook" :aria-describedby="price.id" v-if="price.current" :class="[price.current ? 'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500' : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600', 'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10']">Book Now</a>
        </div>
      </div>
    </div>
  </template>
  
