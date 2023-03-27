import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {initializeApp} from 'firebase/app'
import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/main.css'

const firebaseConfig = {
  //ENTER FIREBASE CONFIG HERE
};

let app = initializeApp(firebaseConfig)
app = createApp(App).use(router).mount('#app')

