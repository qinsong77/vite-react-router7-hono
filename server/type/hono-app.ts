import type { RequestIdVariables } from 'hono/request-id'

import type { User } from '~server/db/schema'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Bindings = {}

type Variables = RequestIdVariables & {}

export type AppType = {
  Bindings: Bindings
  Variables: Variables
}

export type AuthAppType = {
  Variables: {
    userInfo: User
  }
} & AppType
