import vinext from "vinext";
import { defineConfig } from "vite";
// This public portfolio does not depend on private site-hosting configuration,
// a database, or a Cloudflare Worker. Keep a fresh clone buildable.
export default defineConfig({
  plugins: [vinext()],
});

