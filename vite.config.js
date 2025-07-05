import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE");

  return {
    plugins: [react(), tailwindcss(), mkcert()],
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/image": {
          target: env.VITE_IMAGE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/image/, ""),
        },
        "/allDownloadUrl": {
          target: env.VITE_ALLDOWNLOADURL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/allDownloadUrl/, ""),
        },
        "/voiceAudioUrl": {
          target: env.VITE_AUDIO_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/voiceAudioUrl/, ""),
        },
      },
    },
  };
});
