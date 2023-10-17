import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://chitchat-server-6cet.onrender.com",
    },
  },
  plugins: [react()],
});
