import { describe, expect, it } from "vitest";
import { buildInstanceUrl, normalizeInstanceUrl } from "./instance";

describe("instance redirect", () => {
  it("replaces only the origin", () => {
    expect(
      buildInstanceUrl("https://agent.example.com", "/settings/devices?install=pacs#linux"),
    ).toBe("https://agent.example.com/settings/devices?install=pacs#linux");
  });

  it("forwards the root one to one", () => {
    expect(buildInstanceUrl("http://192.168.1.20:8080", "/")).toBe("http://192.168.1.20:8080/");
  });

  it("does not normalize the source path", () => {
    expect(buildInstanceUrl("https://agent.example.com", "/a//b/%2F?q=a%2Fb#part%202")).toBe(
      "https://agent.example.com/a//b/%2F?q=a%2Fb#part%202",
    );
  });

  it("rejects origins with embedded data", () => {
    expect(() => normalizeInstanceUrl("https://user:secret@example.com")).toThrow("credentials");
    expect(() => normalizeInstanceUrl("https://example.com/path")).toThrow("path");
    expect(() => normalizeInstanceUrl("javascript:alert(1)")).toThrow("protocol");
  });
});
