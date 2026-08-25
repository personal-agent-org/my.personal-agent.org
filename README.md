# my.personal-agent.org

Client-side redirect portal for self-hosted Personal Agent instances.

`https://my.personal-agent.org/<path>?<query>#<fragment>` replaces only the origin with the
instance stored in the browser. For example:

```text
https://my.personal-agent.org/settings/devices?install=pacs#linux
                              ↓
https://agent.example.com/settings/devices?install=pacs#linux
```

There is no application backend. The instance origin is stored in `localStorage`; the app makes
no network requests and its Content Security Policy sets `connect-src 'none'`. Account data, the
instance URL, chats, credentials, and tokens are not stored on Personal Agent servers.

## Development

```bash
pnpm install
pnpm dev       # http://127.0.0.1:9100
pnpm check     # formatting, lint, types, tests, production build
```

## Container

The container is published for `linux/amd64` and `linux/arm64`:

```bash
podman run --rm -p 8080:8080 ghcr.io/personal-agent-org/my.personal-agent.org:latest
```

Then open <http://127.0.0.1:8080>. The image runs as an unprivileged user and includes the
history fallback required to preserve arbitrary paths. To build it locally:

```bash
podman build -f Containerfile -t my.personal-agent.org .
```

## Versioning

Releases use CalVer. Git tags follow `vYYYY.M.D`, with an optional fourth sequence component for
multiple releases on the same day: `vYYYY.M.D.N`. Container releases are published with both the
Git tag and the CalVer value without the `v` prefix.

## Security model

- only `http` and `https` instance origins are accepted;
- credentials, paths, queries, and fragments are rejected in the stored instance origin;
- the current path, query, and fragment are transferred unchanged when redirecting;
- the redirect service itself cannot be saved as the target, preventing a loop;
- navigation uses `location.replace`, so the waiting page does not pollute browser history.

## License

[MIT](LICENSE)
