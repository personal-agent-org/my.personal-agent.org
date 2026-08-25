import { defineConfig } from "#q-app";

export default defineConfig(() => ({
  boot: ["i18n"],
  css: ["app.scss"],
  build: {
    target: { browser: ["es2022", "firefox115", "chrome115", "safari14"], node: "node22" },
    typescript: { strict: true, vueShim: true },
    vueRouterMode: "history",
  },
  devServer: { open: false, port: 9100 },
  framework: { config: { brand: { primary: "#2f5da6", dark: "#000000" } }, plugins: ["Meta"] },
}));
