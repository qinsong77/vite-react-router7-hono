# Vite React-router7 Hono App

crated by `pnpm dlx create-react-router@latest --template remix-run/react-router-templates/node-custom-server`

## Getting Started

1. `pnpm install`
2. `docker-compose up`
3. `drizzle-kit push`
4. `pnpm run dev`

## Tech Stack & Tools

- node 22
- pnpm
- chore
  - husky
  - lint-stage
  - prettier
    - use [prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports) for import sorting
  - commitlint
- React 19
- React Router 7
- server
  - Hono 4
  - drizzle-orm
  - redis
  - postgres
  - zod
- css: tailwindcss
- UI Library: [shadcn/ui](https://ui.shadcn.com/)
- logger: [pino](https://github.com/pinojs/pino) && development pretty logging [pino-pretty](https://github.com/pinojs/pino-pretty)
- test:
  - [vitest](https://vitest.dev/)
  - [react testing library](https://testing-library.com/)
- i18n(TBD)
- Docker
- [ ] Playwright: Write end-to-end tests like a pro or cypress
- [ ] Github actions/CI
- [x] Turbo for task cache

## Notes

- If a route has `clientLoader`, it's won't support SSR, preview nothing when access `http://localhost:3000/client-page` directly.
- Environment variables in `.env` powered by [Vite](https://vite.dev/guide/env-and-mode.html#env-variables-and-modes), `server.js` can't access them.

## TBD

- using, https://github.com/honojs/vite-plugins/tree/main/packages/dev-server

## Refer

- https://github.com/remix-run/react-router-templates/blob/main/node-custom-server/server.js
- [forge42dev/base-stack](https://github.com/forge42dev/base-stack/tree/main), it says `The best way to start your react-router v7 project`
- https://github.com/yusukebe/hono-remix-adapter
- https://github.com/sergiodxa/remix-hono/blob/main/src/handler.ts

## Know Issues

- docker `postgresql-init` not working, flyway `Unrecognised migration name format: 0000_messy_domino.sql`, using `drizzle-kit push` instead.

---

# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

This template includes three Dockerfiles optimized for different package managers:

- `Dockerfile` - for npm
- `Dockerfile.pnpm` - for pnpm
- `Dockerfile.bun` - for bun

To build and run using Docker:

```bash

# For pnpm
docker build -f Dockerfile -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── server.js
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
