import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/HomePage.vue');
const Products = () => import('@/views/ProductsPage.vue');
const Contact = () => import('@/views/ContactPage.vue');
const Info = () => import('@/views/InfoPage.vue');
const Profile = () => import('@/views/ProfilePage.vue');


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ],
  mode: 'history'
})
