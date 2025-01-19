import { useState } from "react"

import { Button } from "~/components/ui/button"
import { ApiClient } from "~/endpoint"

// import { useLandingLoader } from "~/routes/_landing"

import type { Route } from "./+types/_landing.client-page"

export async function clientLoader() {
  const res = await ApiClient.api.randomnumberapi.$get()
  const numbers = await res.json()
  return {
    a: 123,
    numbers,
  }
}

export default function ClientPage({ loaderData }: Route.ComponentProps) {
  console.log(window)
  console.log(loaderData)
  const [counter, setCounter] = useState(0)
  return (
    <div className="container mx-auto space-y-4 p-4">
      <h2 className="text-lg font-semibold">this is client component</h2>
      <p>POSTGRES_USER: {import.meta.env.POSTGRES_USER}</p>
      <p>{window.innerWidth}</p>
      <p>{counter}</p>
      <Button onClick={() => setCounter((prev) => prev + 1)}>add</Button>
      <p>client loader data: {loaderData.numbers.join(",")}</p>
      {/*<TestLoaderContext />*/}
    </div>
  )
}

// function TestLoaderContext() {
//   const { requestId } = useLandingLoader()
//   return (
//     <div>
//       <h2>Test loader context</h2>
//       <p>requestId: {requestId}</p>
//     </div>
//   )
// }
