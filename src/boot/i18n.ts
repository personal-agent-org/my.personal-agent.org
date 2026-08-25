import { defineBoot } from "#q-app";
import { createI18n } from "vue-i18n";
import enUS from "@/i18n/en-US";
import deDE from "@/i18n/de-DE";

export default defineBoot(({ app }) => {
  const locale = navigator.language.toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  app.use(
    createI18n({
      legacy: false,
      locale,
      fallbackLocale: "en-US",
      messages: { "en-US": enUS, "de-DE": deDE },
    }),
  );
});
