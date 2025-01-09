import './assets/main.less';
import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import Vant from 'vant';

// Disable vertical swipes in Telegram Web App
window.Telegram.WebApp.disableVerticalSwipes();

if(window.Telegram.WebApp?.requestFullscreen) {
    window.Telegram.WebApp.requestFullscreen();
}


// Create the Vue application
createApp(App).use(Vant).mount('#app');
