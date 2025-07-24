import './assets/main.less';
import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import Vant from 'vant';
import * as AdsgramVue from '@adsgram/vue';

// Disable vertical swipes in Telegram Web App
window.Telegram.WebApp.disableVerticalSwipes();


// Create the Vue application
createApp(App).use(Vant).use(AdsgramVue).mount('#app');
