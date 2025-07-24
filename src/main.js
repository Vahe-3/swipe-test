import './assets/main.less';
import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import Vant from 'vant';
import * as AdsgramVue from '@adsgram/vue';

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
// function requestFullScreen() {
    
//     if (window.Telegram && window.Telegram.WebApp) {        
//         try {            
//             window.Telegram.WebApp.requestFullscreen();

            
//         } catch (error) {
//             console.error("An error occurred while requesting full-screen mode:", error.message);
//         }
//     } 
// }


// requestFullScreen();

// if (window.Telegram.WebApp?.version >= 8.0) {
//     // Attach the fullscreenChanged event listener
//     window.Telegram.WebApp.onEvent('fullscreenChanged', () => {
//         const isFullscreen = window.Telegram.WebApp.isFullscreen;

//         if (isFullscreen) {
//            alert('App entered fullscreen mode');
//         } else {
//             alert('App Not');
//         }
//     });

// }




// Create the Vue application
createApp(App).use(Vant).use(AdsgramVue).mount('#app');
