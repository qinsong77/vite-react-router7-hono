import { CheckCircle2 } from "lucide-react"

const features = [
  {
    name: "Full Stack TypeScript",
    description:
      "End-to-end type safety with TypeScript, from frontend to backend",
  },
  {
    name: "Advanced SSR",
    description:
      "Optimized server-side rendering with streaming and selective hydration",
  },
  {
    name: "Edge Runtime",
    description: "Deploy globally with edge computing for ultra-low latency",
  },
  {
    name: "Database Integration",
    description:
      "First-class PostgreSQL support with Drizzle ORM for type-safe queries",
  },
  {
    name: "Authentication",
    description: "Secure, production-ready authentication system built-in",
  },
  {
    name: "Modern Development",
    description: "HMR, TypeScript, ESLint, and more configured out of the box",
  },
]

const Features = () => {
  return (
    <section className="w-full bg-white py-12 dark:bg-gray-900 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Everything You Need
          </h2>
          <p className="mt-4 max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl">
            A complete toolkit for modern web development. Built with
            performance and developer experience in mind.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="size-6 text-purple-500" />
                  <h3 className="font-bold">{feature.name}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
