import { siteConfig } from "~/constant"
import { getRandomNumbers } from "~/endpoint"
import HomePage from "~/features/home/home-page"

import type { Route } from "./+types/_landing._index"

export async function loader({ context }: Route.LoaderArgs) {
  console.log("index loader")
  const stars = await getRandomNumbers()
  return { requestId: context.requestId, stars }
}

export default function _index({ loaderData }: Route.ComponentProps) {
  return <HomePage stars={loaderData.stars} />
}
