export default {
  portal: {
    service: "my.personal-agent.org",
    title: "Open your Personal Agent",
    intro:
      "Save the address of your self-hosted instance once. Future links keep the same path and open directly on that instance.",
    instanceLabel: "Personal Agent instance URL",
    instancePlaceholder: "https://agent.example.com",
    save: "Save and continue",
    redirecting: "Opening your Personal Agent…",
    redirectTarget: "Redirecting to {instance}",
    openNow: "Open now",
    change: "Use another instance",
    privacy:
      "All settings are stored locally in your browser. No account, instance URL, chat data, credentials, or tokens are stored on our servers.",
    errors: {
      invalid: "Enter a valid instance URL.",
      protocol: "Use an HTTP or HTTPS URL.",
      credentials: "The URL must not contain credentials.",
      query: "Enter the instance URL without a query or fragment.",
      path: "Enter the instance origin without a path.",
      loop: "The redirect service cannot be used as the target instance.",
    },
  },
};
