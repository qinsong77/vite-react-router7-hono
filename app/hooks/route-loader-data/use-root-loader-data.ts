import { useRouteLoaderData } from "react-router"

import type { loader } from "~/root"

export function useRootLoaderData() {
  const data = useRouteLoaderData<typeof loader>("root")
  if (!data) {
    throw new Error(
      "useRootLoaderData must be used in a route that is a child of root.tsx"
    )
  }
  return data
}
