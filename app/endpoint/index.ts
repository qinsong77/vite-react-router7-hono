import { hc } from "hono/client"

import type { AppClientType } from "~server/app"

export const ApiClient = hc<AppClientType>(import.meta.env.VITE_API_URL)
