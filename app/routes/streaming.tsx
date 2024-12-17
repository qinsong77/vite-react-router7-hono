import { Suspense, use } from "react"
import { Separator } from "~/components/ui/separator"
import { Skeleton } from "~/components/ui/skeleton"
import { getRandomNumbers } from "~/endpoint"

import type { Route } from "./+types/streaming"

export async function loader({ context }: Route.LoaderArgs) {
  const stars = await getRandomNumbers()

  const nonCriticalData = new Promise<number[]>((resolve) => {
    setTimeout(() => {
      console.log("nonCriticalData resolved")
      resolve(stars)
      // Server timeout after 5 seconds will broken https://github.com/remix-run/react-router/issues/12467
    }, 3000)
  })

  const criticalData = await new Promise((resolve) =>
    setTimeout(() => resolve("critical"), 300)
  )

  return { criticalData, nonCriticalData, requestId: context.requestId }
}

/*
  https://reactrouter.com/how-to/suspense
 */
export default function Streaming({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto space-y-4 pt-4">
      <h2 className="text-2xl font-bold">Streaming Page</h2>
      <Separator className="" />
      <p>context data, request id: {loaderData.requestId}</p>
      <Separator className="" />
      <p>critical data: {loaderData.criticalData}</p>
      <Separator className="my-4" />
      <h3>Streaming: Non-critical data</h3>
      <Suspense fallback={<Skeleton className="h-4 w-48" />}>
        <NonCriticalData nonCriticalData={loaderData.nonCriticalData} />
      </Suspense>
    </div>
  )
}

function NonCriticalData({
  nonCriticalData,
}: {
  nonCriticalData: Route.ComponentProps["loaderData"]["nonCriticalData"]
}) {
  const randomNumber = use(nonCriticalData)
  return <p>Non-critical streaming data: {randomNumber.join(", ")}</p>
}
