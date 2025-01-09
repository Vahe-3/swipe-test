import './assets/main.less'
import 'vant/lib/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';

window.Telegram.WebApp.disableVerticalSwipes();
// Notify Telegram that the app is ready
const readyMessage = JSON.stringify({
    eventType: 'web_app_ready',
    eventData: {},
  });
  
  window.parent.postMessage(readyMessage, 'https://web.telegram.org');
  
  // Request fullscreen mode
  const expandMessage = JSON.stringify({
    eventType: 'web_app_request_fullscreen',
    eventData: {},
  });
  
  window.parent.postMessage(expandMessage, 'https://web.telegram.org');
  

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

