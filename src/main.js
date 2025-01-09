import './assets/main.less';
import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import Vant from 'vant';

// Disable vertical swipes in Telegram Web App
window.Telegram.WebApp.disableVerticalSwipes();

// Notify Telegram that the Mini App is ready
function notifyAppReady() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready(); // Properly notify Telegram
    } else {
        console.error("Telegram WebApp API is not available.");
    }
}

// Request full-screen mode
function requestFullScreen() {
    
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.version > 6.0) {
        try {            
            window.Telegram.WebApp.requestFullscreen();
        } catch (error) {
            console.error("An error occurred while requesting full-screen mode:", error.message);
        }
    } 
}

// Call when the Mini App is loaded
window.addEventListener('load', () => {
    notifyAppReady(); // Notify that the app is ready
    requestFullScreen(); // Request full-screen mode
});


// Create the Vue application
createApp(App).use(Vant).mount('#app');
