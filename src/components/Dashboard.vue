<!-- src/views/Dashboard.vue -->
<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-6">Available Parking Spaces</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          v-for="space in parkingSpaces"
          :key="space.id"
          class="border p-4 rounded-lg"
          :class="{'bg-green-100': space.available, 'bg-red-100': !space.available}"
        >
          <h3 class="font-bold mb-2">Space #{{ space.number }}</h3>
          <p>Status: {{ space.available ? 'Available' : 'Occupied' }}</p>
          <button
            v-if="space.available"
            @click="bookSpace(space)"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        parkingSpaces: [
          { id: 1, number: 'A1', available: true },
          { id: 2, number: 'A2', available: true },
          { id: 3, number: 'B1', available: false },
          { id: 4, number: 'B2', available: true },
        ]
      }
    },
    methods: {
      bookSpace(space) {
        space.available = false;
        // In real app, push to bookings array
      }
    }
  }
  </script>