FROM docker.io/library/node:22-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS build

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch

COPY . .
RUN pnpm install --offline --frozen-lockfile && pnpm build


FROM docker.io/library/nginx:1.29-alpine@sha256:5616878291a2eed594aee8db4dade5878cf7edcb475e59193904b198d9b830de AS runtime

LABEL org.opencontainers.image.source="https://github.com/personal-agent-org/my.personal-agent.org" \
      org.opencontainers.image.description="Client-side instance link portal for Personal Agent" \
      org.opencontainers.image.licenses="MIT"

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/spa /usr/share/nginx/html

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --spider http://127.0.0.1:8080/ || exit 1

ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
