import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   includeAssets: [],
    //   manifest: {
    //     theme_color: "#f69435",
    //     background_color: "#f69435",
    //     display: "fullscreen",
    //     scope: "/",
    //     start_url: "/",
    //     name: "\u30d5\u30e9\u30c3\u30b7\u30e5\u6697\u7b97",
    //     short_name: "\u6697\u7b97",
    //     description:
    //       "\u30d5\u30e9\u30c3\u30b7\u30e5\u6697\u7b97\u7528\u306e\u30a2\u30d7\u30ea\u3067\u3059\\n\u88fd\u4f5c\u5143: \u5317\u6d77\u9053\u6559\u80b2\u5927\u5b66\u9644\u5c5e\u672d\u5e4c\u4e2d\u5b66\u6821",
    //     icons: [
    //       {
    //         src: "/icon-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/icon-256x256.png",
    //         sizes: "256x256",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/icon-384x384.png",
    //         sizes: "384x384",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/icon-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //     ],
    //   },
    // }),
  ],
  // base: "/daisyui-react-vite-bjomef/",
});
