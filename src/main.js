import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Vue3Mq } from "vue3-mq";

const app = createApp(App);
app.use(router);
app.use(Vue3Mq, {
    preset: "devices"
});
app.mount("#app");

Vue3Mq.updateBreakpoints({
  preset: "devices",
});

// createApp(App).use(router).mount('#app')
