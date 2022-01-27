import { createApp } from 'vue'
import VueLuckyCanvas from '@lucky-canvas/vue'
import App from './App.vue'
import router from './router'
import './style.css'

createApp(App).use(VueLuckyCanvas).use(router).mount('#app')
