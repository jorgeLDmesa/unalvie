import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
  project: "proj_jswscfxqotzywgciawyj",
  maxDuration: 300, // 5 minutes max duration for tasks
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ["./trigger"],
  build: {
    external: ["playwright", "playwright-core"],
  },
  // Para producción, usa una máquina con más recursos si es necesario
  machine: "small-1x",
});
