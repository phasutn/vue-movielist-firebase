import { createRouter, createWebHistory } from 'vue-router'
import CityList from '../views/CityList.vue'
import Info from '../views/Info.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

import {getAuth, onAuthStateChanged} from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/cities'
    },

    {
      path: '/:catchAll(.*)',
      redirect: '/signin'
    },
    {
      path: '/cities',
      name: 'CityList',
      component: CityList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/info/:city',
      name: 'Info',
      component: Info,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})


const getCurrentUser = () => {
  return new Promise ((resolve, reject)=>{
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) =>{
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}


router.beforeEach(async(to, from, next)=> {
  const requireAuth = to.matched.some((record)=>record.meta.requireAuth)
  if(requireAuth) {
    if(await getCurrentUser()){
      console.log('authorized user to access the page')
        next()
    } else {
      console.log('Unauthorized user to access the page')
      next('signin')
    }
  } else {
    next()
  }
})

export default router