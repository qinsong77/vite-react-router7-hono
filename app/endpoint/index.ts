import { hc } from "hono/client"

import { AppType } from "../../server/app"

export const client = hc<AppType>("http://localhost:3000/")

export async function getRandomNumbers() {
  const response = await fetch(
    "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=3"
  )
  if (!response.ok) {
    throw new Error("Failed to fetch random numbers")
  }
  return (await response.json()) as number[]
}
