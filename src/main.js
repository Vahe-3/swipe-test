import './assets/main.less'
import 'vant/lib/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';

window.Telegram.WebApp.disableVerticalSwipes();
console.log(window.Telegram.WebApp.version);

if(window.Telegram.WebApp.version > 6) {
    window.Telegram.WebApp.addToHomeScreen();
}


createApp(App).use(Vant).mount('#app');

