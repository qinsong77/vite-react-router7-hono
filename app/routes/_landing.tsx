import { Outlet } from "react-router"

import { LandingLayout } from "~/components/landing-layout"

// import { siteConfig } from "~/constant"

// import { getRandomNumbers } from "~/endpoint"

// import type { Route } from "./+types/_landing"

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: siteConfig.name },
//     { name: "description", content: siteConfig.description },
//   ]
// }

// export async function loader({ context }: Route.LoaderArgs) {
//   console.log("landing loader") will run
//   //   const stars = await getRandomNumbers()
//   //   return { requestId: context.requestId, stars }
// }

export default function IndexLandingLayout() {
  return (
    <LandingLayout>
      <Outlet />
    </LandingLayout>
  )
}
