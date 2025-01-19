import { CloudIcon, FileTextIcon, ServerIcon, StarIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { useRootLoaderData } from "~/hooks/route-loader-data/use-root-loader-data"
import { useLandingIndexLoaderData } from "~/routes/_landing._index"

export default function ServerInfoCard() {
  const { requestId } = useRootLoaderData()
  const indexLoaderData = useLandingIndexLoaderData()

  const items = [
    {
      icon: ServerIcon,
      title: "Request Id from Hono context, root Loader",
      value: requestId,
      className: "text-blue-500",
    },
    {
      icon: CloudIcon,
      title: "Index Loader Data",
      value: indexLoaderData,
      className: "text-orange-500",
    },
    {
      icon: FileTextIcon,
      title: "Server Loader Data",
      value: indexLoaderData.text,
      className: "text-green-500",
    },
    {
      icon: StarIcon,
      title: "Random Number from external API",
      value: indexLoaderData.numbers.join(", "),
      className: "text-yellow-500",
    },
  ]

  return (
    <section className="w-full bg-gradient-to-br from-purple-50 to-blue-50 py-12 dark:from-gray-900 dark:to-gray-800 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Server Information
          </h2>
          <p className="mt-4 max-w-[600px] text-gray-500 dark:text-gray-400">
            Real-time server data and runtime information
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item) => (
            <Card
              key={item.title}
              className="border-none shadow-lg transition-all duration-200 hover:shadow-xl dark:bg-gray-800"
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <item.icon className={`size-6 ${item.className}`} />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {typeof item.value === "object" ? (
                  Object.entries(item.value).map(([key, value]) => (
                    <p
                      key={key}
                      className="font-mono text-sm text-gray-600 dark:text-gray-300"
                    >
                      {String(key)}:{String(value)}
                    </p>
                  ))
                ) : (
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-300">
                    {String(item.value)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
