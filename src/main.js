import './assets/main.less'
import 'vant/lib/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';

window.Telegram.WebApp.disableVerticalSwipes();
// Function to notify Telegram that the Mini App is ready
function notifyAppReady() {
    const readyMessage = JSON.stringify({
      eventType: 'web_app_ready',
      eventData: {},
    });
  
    if (window.parent) {
      window.parent.postMessage(readyMessage, 'https://web.telegram.org'); // Notify Telegram Web
    }
  }
  
  // Function to request full-screen mode
  function requestFullScreen() {
    const expandMessage = JSON.stringify({
      eventType: 'web_app_request_fullscreen', // Full-screen request event
      eventData: {}, // No additional data required
    });
  
    if (window.parent) {
      window.parent.postMessage(expandMessage, 'https://web.telegram.org'); // Send request to Telegram Web
    }
  }
  
  // Call when the Mini App is loaded
  window.addEventListener('load', () => {
    notifyAppReady(); // Notify that the app is ready
    requestFullScreen(); // Request full-screen mode
  });
  
  

// Check if the Telegram WebApp supports the addToHomeScreen method
// if (Telegram.WebApp.isExpanded && Telegram.WebApp.canAddToHomeScreen) {
//     // Call the method to prompt the user to add the app to their home screen
//     Telegram.WebApp.addToHomeScreen()
//         .then(() => {
//             console.log("Added to home screen successfully!");
//         })
//         .catch((error) => {
//             console.error("Failed to add to home screen:", error);
//         });
// } else {
//     // alert("Add to Home Screen is not supported on this device or environment.");
// }



createApp(App).use(Vant).mount('#app');

