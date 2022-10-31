import vue from '@vitejs/plugin-vue';
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";


export default {
  root: "./src/whats-for-tea-vue/",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src/whats-for-tea-vue/src") }],
  },
};