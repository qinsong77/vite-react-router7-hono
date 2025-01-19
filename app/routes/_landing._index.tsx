import { useRouteLoaderData } from 'react-router'

import { getRandomNumbers } from '~/endpoint/server'
import HomePage from '~/features/home/home-page'

import type { Route } from './+types/_landing._index'

export async function loader({ context }: Route.LoaderArgs) {
  console.log('landing loader running')
  const numbers = await getRandomNumbers()
  return {
    requestId: context.requestId,
    numbers,
    text: 'index loader data',
  }
}

export default function _index({ loaderData }: Route.ComponentProps) {
  console.log('rending index loader data', loaderData)
  return <HomePage />
}

export const useLandingIndexLoaderData = () => {
  const data = useRouteLoaderData<typeof loader>('routes/_landing._index')
  if (!data) {
    throw new Error(
      'useLandingIndexLoaderData must be used in a route that is a child of _landing._index.tsx',
    )
  }
  return data
}
