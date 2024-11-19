import './assets/main.less'
import 'vant/lib/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';

window.Telegram.WebApp.disableVerticalSwipes();
window.Telegram.WebApp.addToHomeScreen();

createApp(App).use(Vant).mount('#app');

