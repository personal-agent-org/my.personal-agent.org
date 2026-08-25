export function normalizeInstanceUrl(value: string): string {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error("invalid");
  }
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("protocol");
  if (url.username || url.password) throw new Error("credentials");
  if (url.search || url.hash) throw new Error("query");
  if (url.pathname !== "/" && url.pathname !== "") throw new Error("path");
  return url.origin;
}

/** Replace only the origin. Path, query, and fragment come from the my.personal-agent.org URL. */
export function buildInstanceUrl(instance: string, sourcePath: string): string {
  if (!sourcePath.startsWith("/")) throw new Error("source-path");
  return `${normalizeInstanceUrl(instance)}${sourcePath}`;
}
