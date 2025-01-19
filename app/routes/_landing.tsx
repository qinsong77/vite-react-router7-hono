import { Outlet } from "react-router"
import { useRouteLoaderData } from "react-router"

import { LandingLayout } from "~/components/landing-layout"

import type { Route } from "./+types/_landing"

export function loader({ context }: Route.LoaderArgs) {
  console.log("landing layout loader running")
  // layout loader will block whole page request, but underneath loader will be executed parallel
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return {
    requestId: context.requestId,
    text: "root layout loader data",
  }
}

export default function IndexLandingLayout() {
  return (
    <LandingLayout>
      <Outlet />
    </LandingLayout>
  )
}

export const useLandingLoader = () => {
  const data = useRouteLoaderData<typeof loader>("routes/_landing")
  if (!data) {
    throw new Error(
      "useLandingLoader must be used in a route that is a child of _landing.tsx"
    )
  }
  return data
}
