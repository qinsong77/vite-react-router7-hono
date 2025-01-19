import { Suspense, use } from 'react'

import { Separator } from '~/components/ui/separator'
import { Skeleton } from '~/components/ui/skeleton'
import { useLandingLoader } from '~/routes/_landing'

import type { Route } from './+types/_landing.streaming'

export async function loader({ context }: Route.LoaderArgs) {
  const nonCriticalData = new Promise<number[]>((resolve) => {
    setTimeout(() => {
      console.log('nonCriticalData resolved')
      resolve([10, 30, 60])
    }, 3000)
  })

  const criticalData = await new Promise((resolve) =>
    setTimeout(() => resolve('critical'), 300),
  )

  return { criticalData, nonCriticalData, requestId: context.requestId }
}

/*
  https://reactrouter.com/how-to/suspense
 */
export default function Streaming({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto space-y-4 p-4">
      <h2 className="text-2xl font-bold">Streaming Page</h2>
      <Separator className="my-2" />
      <p>hono injected context data, request id: {loaderData.requestId}</p>
      <Separator className="my-2" />
      <p>critical data: {loaderData.criticalData}</p>
      <Separator className="my-4" />
      <h3>Streaming: Non-critical data</h3>
      <Suspense fallback={<Skeleton className="h-4 w-48" />}>
        <NonCriticalData nonCriticalData={loaderData.nonCriticalData} />
      </Suspense>
      <Separator className="my-4" />
      <TestLoaderContext />
    </div>
  )
}

function NonCriticalData({
  nonCriticalData,
}: {
  nonCriticalData: Route.ComponentProps['loaderData']['nonCriticalData']
}) {
  const randomNumber = use(nonCriticalData)
  return <p>Non-critical streaming data: {randomNumber.join(', ')}</p>
}

function TestLoaderContext() {
  const { requestId } = useLandingLoader()
  return (
    <div>
      <h3 className="text-xl font-semibold">Index loader context data</h3>
      <p>requestId: {requestId}</p>
    </div>
  )
}
