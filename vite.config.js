import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import withMT from "@material-tailwind/react/utils/withMT";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE");

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env": env,
    },
    server: {
      proxy: {
        "/api": {
          target: "http://95.216.43.170:8080",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      allowedHosts: [".ngrok-free.app"], 
    },
  };
});


