import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useSettingsStore } from './stores'

import App from './App.vue'
import router from './router' 

const app = createApp(App)

app.use(createPinia())  
app.use(router)
const settingsStore = useSettingsStore()

app.mount('#app')
