import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import ParkingBooking from '../components/ParkingBooking.vue'
import BookingsList from '../components/BookingList.vue'
import { useAuthStore } from '../stores/auth'  // Add this import
import BookingDetails from '../components/BookingDetails.vue'
import UpdateBooking from '../components/UpdateBooking.vue'
import ParkingPriceDetails from '../components/ParkingPriceDetails.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: Login },
  { path: '/book', name: 'book', component: ParkingBooking, meta: { requiresAuth: true } },
  { path: '/bookings', name: 'bookings', component: BookingsList, meta: { requiresAuth: true } },
  {
    path: '/booking-details/:id', // the ':id' part will be passed as a parameter
    name: 'bookingDetails',
    component: BookingDetails,
    props: true, // automatically pass the route params as props
    meta: { requiresAuth: true }
  },
  {
    path: '/update-booking/:id', // the ':id' part will be passed as a parameter
    name: 'updateBooking',
    component: UpdateBooking,
    props: true, // automatically pass the route params as props
    meta: { requiresAuth: true }
  },
  {
    path: '/parking-space-price-details/:id/:date_from/:date_to', // the ':id' part will be passed as a parameter
    name: 'parkingSpacePriceDetails',
    component: ParkingPriceDetails,
    props: true, // automatically pass the route params as props
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()  // Now properly scoped inside the navigation guard
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router