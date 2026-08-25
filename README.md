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

## Security model

- only `http` and `https` instance origins are accepted;
- credentials, paths, queries, and fragments are rejected in the stored instance origin;
- the current path, query, and fragment are transferred unchanged when redirecting;
- the redirect service itself cannot be saved as the target, preventing a loop;
- navigation uses `location.replace`, so the waiting page does not pollute browser history.

## License

[MIT](LICENSE)
