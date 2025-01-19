import { Hono } from 'hono'

import type { AuthAppType } from '~server/type/hono-app'

import { db } from '../db'
import { authMiddleware } from '../middleware/auth'

const app = new Hono<AuthAppType>()
  .use('/*', authMiddleware)
  .get('/profile', async (c) => {
    const userInfo = c.get('userInfo')
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userInfo.id),
      columns: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    })

    if (!user) {
      return c.json({ message: 'User not found' }, 404)
    }

    return c.json(user)
  })

export default app
