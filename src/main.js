import './assets/main.less'
import 'vant/lib/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';

window.Telegram.WebApp.disableVerticalSwipes();
console.log(window.Telegram.WebApp.version);

// Check if the Telegram WebApp supports the addToHomeScreen method
if (Telegram.WebApp.isExpanded && Telegram.WebApp.canAddToHomeScreen) {
    // Call the method to prompt the user to add the app to their home screen
    Telegram.WebApp.addToHomeScreen()
        .then(() => {
            console.log("Added to home screen successfully!");
        })
        .catch((error) => {
            console.error("Failed to add to home screen:", error);
        });
} else {
    alert("Add to Home Screen is not supported on this device or environment.");
}



createApp(App).use(Vant).mount('#app');

