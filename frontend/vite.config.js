// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   esbuild: {
//     loader: "jsx",               // <-- IMPORTANT FIX
//     include: /src\/.*\.js$/,     // allow JSX inside .js files
//   },
//   server: {
//     host: "0.0.0.0",
//     port: 5173
//   }
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
