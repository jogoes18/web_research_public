import './style.css'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router/index.ts';

const app = createApp(App);
//app.use(vuetify);
app.use(router);
//app.use(AxiosPlugin, { baseUrl: baseUrl })
//app.use(pinia)
app.mount('#app');

