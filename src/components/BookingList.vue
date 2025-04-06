<script setup>
import { onMounted, ref } from 'vue';
import api from '../axios';
import { useRouter } from 'vue-router';
import { useNotficationStore } from '../stores/notification';

const bookings = ref(null)
const router = useRouter();
const notificationStore = useNotficationStore();

onMounted(async() => {

  try{

    let response = await api.get('/bookings');

    console.log(response.data.data);
    bookings.value = response.data.data;
  }catch(e){

  }
});

const handleView = (id) => {

  router.push({ name: 'bookingDetails', params: { id: id } })
}

const handleUpdate = (id) => {

  router.push({ name: 'updateBooking', params: { id: id } })
}

const handleCancel = async (id) => {

  try{

    let response = await api.patch('/cancel-booking/'+id);

    notificationStore.setNotifiction('Booking has been cancelled');

    const bookingIndex = bookings.value.findIndex(item => item.id === id);

    if (bookingIndex !== -1) {
      // Update the item in the array
      bookings.value[bookingIndex].status = 'cancelled';
    }



  }catch(e){

  }
}
</script>


<template>
   <div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
        <div class="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div v-if="bookings">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="text-base/7 font-semibold text-indigo-600">Booking Details</h2>
        </div>
       <div class="mx-auto mt-6 max-w-6xl text-center">
          <h1> Details</h1>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   Reference
                </th>
                <th scope="col" class="px-6 py-3">
                    Dates
                </th>
                <th scope="col" class="px-6 py-3">
                    Parking
                </th>
                <th scope="col" class="px-6 py-3">
                   Price
                </th>
                <th scope="col" class="px-6 py-3">
                   Status
                </th>
                <th scope="col" class="px-6 py-3">
                   Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr :class="[booking.can_update == 0 ? 'bg-gray-200' : 'dark:bg-gray-800 bg-white dark:border-gray-700', ' border-b border-gray-200']" v-for="booking in bookings" :key="booking.id">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                    {{ booking.reference_id }}
                </th>
                <td class="px-6 py-4">
                  {{ booking.date_from }} - {{ booking.date_to }}
                </td>
                <td class="px-6 py-4">
                  {{ booking.parking_space.name }}
                </td>
                <td class="px-6 py-4">
                  {{ booking.total_price }}
                </td>
                <td class="px-6 py-4 capitalize">
                  {{ booking.status }}
                </td>
                <td class="px-6 py-4 flex gap-2">
                  <a class="text-indigo-600 cursor-pointer" @click.prevent="handleView(booking.id)"> View </a>
                  <a class="text-indigo-600 cursor-pointer" @click.prevent="handleUpdate(booking.id)" v-if="booking.can_update && booking.status == 'active'"> Update </a>
                  <a class="text-red-600 cursor-pointer" @click.prevent="handleCancel(booking.id)" v-if="booking.can_update &&  booking.status == 'active'" > Cancel </a>
                </td>
            </tr>
            </tbody>
          </table>
       </div>
      
      </div>
        
    </div>
  </template>
  