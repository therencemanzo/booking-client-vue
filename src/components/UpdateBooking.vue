<script setup>
import { onMounted, ref } from 'vue';
import api from '../axios';
import { useNotficationStore } from '../stores/notification';


const dateFrom = ref(null);
const dateTo = ref(null);
const error = ref(null)
const notificationStore = useNotficationStore()

const suggestedParkingSlot = ref([]);

const props = defineProps({
  id: { type: String, required: true },
});

const bookingDetails = ref(null);

onMounted(async() => {
  try{

    let response = await api.get('/booking/' + props.id);

    bookingDetails.value = response.data.data;

    dateFrom.value = bookingDetails.value.date_from;
    dateTo.value = bookingDetails.value.date_to;

  }catch(e){ 

  }
})

const handleUpdate = async () => {

    error.value  = '';
    suggestedParkingSlot.value = [];
    try{
        let response = await api.patch('/booking/'+props.id, {
            parking_space_id : bookingDetails.value.parking_space.id,
            date_from: dateFrom.value,
            date_to: dateTo.value
        });

        bookingDetails.value = response.data;
        notificationStore.setNotifiction('Successfully Updated Booking')
       
    }catch(e){
        error.value = e.response.data.message

        getOtherSlot();
    }
}

const handleSelectOthers = async (id) => {

    error.value  = '';
    suggestedParkingSlot.value = [];
    try{
        let response = await api.patch('/booking/'+props.id, {
            parking_space_id : id,
            date_from: dateFrom.value,
            date_to: dateTo.value
        });
        bookingDetails.value = response.data;
        notificationStore.setNotifiction('Successfully Updated Booking')
       
    }catch(e){
        error.value = e.response.data.message

    }

}
const getOtherSlot = async () => {

    try{
        let response = await api.get('/parking-spaces', {
            params: {
                date_from: dateFrom.value,
                date_to: dateTo.value
            }
        });

        suggestedParkingSlot.value = response.data.data;
    }catch(e){
        error.value = e.response.data.message
    }
}

</script>

<template>
    <div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
        <div class="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div v-if="bookingDetails">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="text-base/7 font-semibold text-indigo-600 capitalize">{{ bookingDetails.status }}</h2>
          <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">{{ bookingDetails.reference_id }}</p>
        </div>
       <div class="mx-auto max-w-3xl text-center">
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
                    <button type="submit" @click.prevent="handleUpdate" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update </button>
                </div>
            </div>
       </div>

       <div class=" mx-auto max-w-4xl text-center mt-10" v-if="suggestedParkingSlot.length > 0">
            <p> Available Parking Spaces</p>
            <div class="mx-auto mt-16 grid grid-cols-5 gap-4" v-if="suggestedParkingSlot.length > 0">
                <div class="col-span-1 border rounded-sm p-3" v-for="parkingSpace in suggestedParkingSlot" :key="parkingSpace.id">
                    <h1 class="mt-2 text-lg font-semibold text-gray-900 truncate">{{ parkingSpace.name }}</h1>
                    <p>{{ parkingSpace.price }}</p>
                    <button class="bg-indigo-600 hover:bg-indigo-200 cursor-pointer text-white p-2 mt-5 rounded-sm" @click.event="handleSelectOthers(parkingSpace.id)">Update to this</button>
                </div>
            </div>
        </div>
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
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" v-for="detail in bookingDetails.details" :key="detail.date">
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
          <div class="mt-2 border-t">
            <p class="mt-5 text-gray-700 text-lg"> Total Price : {{ bookingDetails.total_price }}</p>
            </div>
       </div>
      
      </div>
        
    </div>
</template>