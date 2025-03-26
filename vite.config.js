import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE");

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          // target: "http://95.216.43.170:8080",
          target: process.env.VITE_API_BASE_URL || "http://95.216.43.170:8080",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
