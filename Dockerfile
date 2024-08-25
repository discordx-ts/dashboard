FROM node:lts-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=api --prod /prod/api
RUN pnpm deploy --filter=bot --prod /prod/bot
RUN pnpm deploy --filter=web --prod /prod/web

FROM base AS api
COPY --from=build /prod/api /app
WORKDIR /app
EXPOSE 4000
CMD [ "npm", "run", "start:prod" ]

FROM base AS bot
COPY --from=build /prod/bot /app
WORKDIR /app
CMD [ "npm", "run", "start" ]

FROM base AS web
COPY --from=build /prod/web /app
WORKDIR /app
EXPOSE 3000
CMD [ "npm", "run", "start" ]