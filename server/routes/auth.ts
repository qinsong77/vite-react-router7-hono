import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

import { db } from '../db'
import { users } from '../db/schema'
import { redisClient } from '../redis'
import { generateSessionId, hashPassword, verifyPassword } from '../utils/auth'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character',
    ),
})

const app = new Hono()
  .post('/register', zValidator('json', registerSchema), async (c) => {
    try {
      const { email, password } = c.req.valid('json')

      const hashedPassword = await hashPassword(password)
      await db.insert(users).values({
        email,
        passwordHash: hashedPassword,
      })
      return c.json({ message: 'User registered successfully' }, 201)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return c.json({ message: 'Registration failed' }, 400)
    }
  })
  .post(
    '/login',
    zValidator(
      'json',
      z.object({
        email: z.string().email('Invalid email address'),
        password: z.string(),
      }),
    ),
    async (c) => {
      const { email, password } = c.req.valid('json')

      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
      })

      if (!user) {
        throw new HTTPException(401, { message: 'Invalid credentials' })
      }

      const isValid = await verifyPassword(password, user.passwordHash)
      if (!isValid) {
        throw new HTTPException(401, { message: 'Password is incorrect' })
      }

      const sessionId = generateSessionId()
      await redisClient.set(
        `session:${sessionId}`,
        JSON.stringify({
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          lastSignInAt: user.lastSignInAt,
        }),
        {
          EX: 24 * 60 * 60,
        },
      )

      setCookie(c, 'sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60,
      })

      return c.json({ message: 'Login successful' })
    },
  )
  .post('/logout', async (c) => {
    const sessionId = getCookie(c, 'sessionId')
    if (sessionId) {
      await redisClient.del(`session:${sessionId}`)
      setCookie(c, 'sessionId', '', { maxAge: 0 })
    }
    return c.json({ message: 'Logged out successfully' })
  })

export default app
