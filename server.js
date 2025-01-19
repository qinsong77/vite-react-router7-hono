import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

// Short-circuit the type-checking of the built output.
const BUILD_PATH = './build/server/index.js'
const IS_DEV = process.env.NODE_ENV === 'development'
const PORT = Number.parseInt(process.env.PORT || '3000')

const app = new Hono()

if (IS_DEV) {
  console.log('Starting development server')

  const viteDevServer = await import('vite').then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    }),
  )

  // refer: https://github.com/Blankeos/hono-vike-websockets/blob/main/hono-entry.ts
  app.use(async (c, next) => {
    const viteDevMiddleware = () =>
      new Promise((resolve) => {
        viteDevServer.middlewares(c.env.incoming, c.env.outgoing, () =>
          resolve(),
        )
      })
    await viteDevMiddleware()
    await next()
  })
  app.use(async (c) => {
    try {
      const { default: sourceApp } =
        await viteDevServer.ssrLoadModule('./server/app.ts')

      return await sourceApp.fetch(c.req.raw)
    } catch (error) {
      console.error(error)
      if (typeof error === 'object' && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error)
      }
      throw error
    }
  })

  serve(
    {
      fetch: app.fetch,
      port: PORT,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`)
    },
  )
} else {
  console.log('Starting production server')

  app.use(
    '/assets/*',
    serveStatic({
      root: './build/client/assets',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable', // 1年缓存
      },
    }),
  )

  app.use(
    serveStatic({
      root: './build/client',
      headers: {
        'Cache-Control': 'public, max-age=3600', // 1小时缓存
      },
    }),
  )

  const { default: sourceApp } = await import(BUILD_PATH)

  app.use(async (c) => {
    try {
      return await sourceApp.fetch(c.req.raw)
    } catch (error) {
      console.error(error)
    }
  })

  serve(
    {
      fetch: app.fetch,
      port: PORT,
    },
    (info) => {
      console.log(info)
      console.log(`Prod Server is running on http://localhost:${info.port}`)
    },
  )
}
