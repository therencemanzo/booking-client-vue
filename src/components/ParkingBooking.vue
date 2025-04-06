<script setup>
import { ref } from 'vue'
import api from '../axios';
import { useRouter } from 'vue-router';
import { useNotficationStore } from '../stores/notification';

const notificationStore = useNotficationStore();
const router = useRouter();
const dateFrom = ref('');
const dateTo = ref('');
const parkingSpaces = ref([]);
const error = ref(null);
const numberOfAvailabSpaces = ref(0);

const handleSubmit = async () => {
  // Handle form submission logic here

    error.value = null;
    parkingSpaces.value = [];
    try{
        let response = await api.get('/parking-spaces', {
            params: {
                date_from: dateFrom.value,
                date_to: dateTo.value
            }
        });

        parkingSpaces.value = response.data.data;
        numberOfAvailabSpaces.value = response.data.meta.total;

    }catch (er) {
        error.value = er.response.data.message

        //console.error('Error fetching parking spaces:', error);
    }
  
  
};

const handleBook = async (id) => { 

    try{

        let response = await api.post('/parking-spaces/book', {
            parking_space_id : id,
            date_from: dateFrom.value,
            date_to: dateTo.value

        });

        notificationStore.setNotifiction('Sucessfully Booked Parking Slot')
        router.push({ name: 'bookingDetails', params: { id: response.data.id } })
        

    }catch(e){

    }finally{

    }
    //router.push({ name: 'ParkingSpaceDetails', params: { id: id } })

}


</script>

<template>
     <div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
        <div class="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base/7 font-semibold text-indigo-600">Park Here</h2>
        <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">Choose the right Parking Slot</p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">Choose an affordable parking slot in Manchester Parking.</p>
        <div class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl">
            <div class="border-b border-gray-900/10 pb-12 w-full">
                <h2 class="text-base/7 font-semibold text-gray-900">When are you planning to book?</h2>
                <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
                    <div class="sm:col-span-1">
                        <label for="date-from" class="block text-sm/6 font-medium text-gray-900">From Date</label>
                        <div class="mt-2">
                        <input type="date" v-model="dateFrom" id="date-fom" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                    <div class="sm:col-span-1">
                        <label for="date-to" class="block text-sm/6 font-medium text-gray-900">To Date</label>
                        <div class="mt-2">
                        <input type="date" v-model="dateTo" id="date-to" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                    <div class="sm:col-span-2" v-if="error">
                       <p class="text-red-500 text-sm"> {{ error }}</p>
                    </div>
                    <div class="sm:col-span-2">
                       <button type="submit" @click.prevent="handleSubmit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Check</button>
                    </div>
                </div>
            </div>
        </div>
        <div class=" mx-auto max-w-4xl text-center mt-10" v-if="parkingSpaces.length > 0">
            <p> {{numberOfAvailabSpaces }} Available Parking Spaces</p>
            <div class="mx-auto mt-16 grid grid-cols-5 gap-4" v-if="parkingSpaces.length > 0">
                <div class="col-span-1 border rounded-sm p-3" v-for="parkingSpace in parkingSpaces" :key="parkingSpace.id">
                    <h1 class="mt-2 text-lg font-semibold text-gray-900 truncate">{{ parkingSpace.name }}</h1>
                    <p>{{ parkingSpace.price }}</p>
                    <button class="bg-indigo-600 hover:bg-indigo-200 cursor-pointer text-white p-2 mt-5 rounded-sm" @click.event="handleBook(parkingSpace.id)">Book now</button>
                </div>
            </div>
        </div>
    </div>
</template>