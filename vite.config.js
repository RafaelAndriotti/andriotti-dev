import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base relativa: funciona em https://<usuario>.github.io/andriotti-dev/ e em domínio próprio
export default defineConfig({
  plugins: [react()],
  base: "./",
});
