import { siteConfig } from "~/constant"
import { getRandomNumbers } from "~/endpoint"
import HomePage from "~/features/home/home-page"

import type { Route } from "./+types/_index"

export function meta({}: Route.MetaArgs) {
  return [
    { title: siteConfig.name },
    { name: "description", content: siteConfig.description },
  ]
}

export async function loader({ context }: Route.LoaderArgs) {
  const stars = await getRandomNumbers()
  return { requestId: context.requestId, stars }
}

export default function _index({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <HomePage stars={loaderData.stars} />
    </div>
  )
}
