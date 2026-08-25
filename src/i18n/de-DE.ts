export default {
  portal: {
    service: "my.personal-agent.org",
    title: "Deinen Personal Agent öffnen",
    intro:
      "Speichere einmal die Adresse deiner selbst gehosteten Instanz. Künftige Links übernehmen denselben Pfad und öffnen ihn direkt auf dieser Instanz.",
    instanceLabel: "URL deiner Personal-Agent-Instanz",
    instancePlaceholder: "https://agent.example.com",
    save: "Speichern und weiter",
    redirecting: "Dein Personal Agent wird geöffnet…",
    redirectTarget: "Weiterleitung zu {instance}",
    openNow: "Jetzt öffnen",
    change: "Andere Instanz verwenden",
    privacy:
      "Alle Einstellungen werden lokal in deinem Browser gespeichert. Auf unseren Servern werden weder Konten, Instanz-URLs, Chatdaten, Zugangsdaten noch Tokens gespeichert.",
    errors: {
      invalid: "Gib eine gültige Instanz-URL ein.",
      protocol: "Verwende eine HTTP- oder HTTPS-URL.",
      credentials: "Die URL darf keine Zugangsdaten enthalten.",
      query: "Gib die Instanz-URL ohne Query oder Fragment ein.",
      path: "Gib nur den Ursprung der Instanz ohne Pfad ein.",
      loop: "Der Weiterleitungsdienst kann nicht als Zielinstanz verwendet werden.",
    },
  },
};
