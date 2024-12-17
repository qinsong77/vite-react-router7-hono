import { client } from "app/endpoint"
import { useState } from "react"
import { Button } from "~/components/ui/button"

import type { Route } from "./+types/client-page"

export async function clientLoader() {
  const res = await client.api.randomnumberapi.$get()
  console.log(res)
  return await res.json()
}

export default function ClientPage({ loaderData }: Route.ComponentProps) {
  console.log(window)
  console.log(loaderData)
  const [counter, setCounter] = useState(0)
  return (
    <div>
      <h2>this is client component</h2>
      <p>{window.innerWidth}</p>
      <p>{counter}</p>
      <Button onClick={() => setCounter((prev) => prev + 1)}>add</Button>
    </div>
  )
}
