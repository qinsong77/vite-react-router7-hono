# Vite React-router7 Hono App

crated by `pnpm dlx create-react-router@latest --template remix-run/react-router-templates/node-custom-server`


## Notes

if a route has `clientLoader`, it's won't support SSR.

todo https://github.com/honojs/vite-plugins/tree/main/packages/dev-server

Environment variables in `.env` powered by [Vite](https://vite.dev/guide/env-and-mode.html#env-variables-and-modes), `server.js` can't access them.

## Refer

- https://github.com/yusukebe/hono-remix-adapter
- https://github.com/remix-run/react-router-templates/blob/main/node-custom-server/server.js
- https://github.com/sergiodxa/remix-hono/blob/main/src/handler.ts
- https://github.com/SoraKumo001/react-router7-hono
- https://github.com/rphlmr/react-router-hono-server?tab=readme-ov-file#options

https://www.robinwieruch.de/react-feature-architecture/
https://www.robinwieruch.de/react-component-composition/

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
# For npm
docker build -t my-app .

# For pnpm
docker build -f Dockerfile.pnpm -t my-app .

# For bun
docker build -f Dockerfile.bun -t my-app .

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
