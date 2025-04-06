<script setup>
import { onMounted, ref } from 'vue';
import api from '../axios';
import { useNotficationStore } from '../stores/notification';
import { useRouter } from 'vue-router';

const notificationStore = useNotficationStore()
const router = useRouter()

const props = defineProps({
  id: { type: String, required: true },
  date_from: { type: String, required: true },
  date_to: { type: String, required: true },
});

const bookingDetails = ref(null);

onMounted(async() => {
  try{

    let response = await api.get('/parking-space-price-details/' + props.id, {params: {date_from : props.date_from, date_to: props.date_to}});

    bookingDetails.value = response.data.data;

  }catch(e){ 

  }
})

const handleBook = async () => { 

try{

    let response = await api.post('/parking-spaces/book', {
        parking_space_id : props.id,
        date_from: props.date_from,
        date_to: props.date_to

    });

    notificationStore.setNotifiction('Sucessfully Booked Parking Slot')
    router.push({ name: 'bookingDetails', params: { id: response.data.id } })
    

}catch(e){

}finally{

}
router.push({ name: 'ParkingSpaceDetails', params: { id: id } })

}

</script>

<template>
    <div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
        <div class="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div v-if="bookingDetails">
        <div class="mx-auto max-w-4xl text-center">
          <!-- <h2 class="text-base/7 font-semibold text-indigo-600 capitalize">{{ bookingDetails.status }}</h2>
          <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">{{ bookingDetails.reference_id }}</p> -->
        </div>
        <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">{{ bookingDetails.name }} on {{ date_from }} to {{ date_to }} with a total of {{ bookingDetails.price }}</p>
       <div class="mx-auto mt-6 max-w-2xl text-center">
          <h1> Details</h1>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   Day
                </th>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                   Season
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" v-for="detail in bookingDetails.price_details" :key="detail.date">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ detail.day }}
                </th>
                <td class="px-6 py-4">
                  {{ detail.date }}
                </td>
                <td class="px-6 py-4">
                  {{ detail.price }}
                </td>
                <td class="px-6 py-4">
                  {{ detail.season }}
                </td>
            </tr>
            </tbody>
          </table>
          <button type="submit" @click.prevent="handleBook" class="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Book</button>
       </div>
       
      </div>
        
    </div>
</template>