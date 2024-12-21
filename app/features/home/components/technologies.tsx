import {
  Cog,
  Database,
  Layers,
  CodepenIcon as ReactIcon,
  Repeat,
  Server,
  Terminal,
  Zap,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

const technologies = [
  {
    name: "React 19",
    description:
      "Build user interfaces with the latest React features including use hooks",
    icon: ReactIcon,
  },
  {
    name: "Vite",
    description: "Lightning fast HMR and optimized build process",
    icon: Zap,
  },
  {
    name: "React Router 7",
    description: "Modern routing with data loading and mutations",
    icon: Repeat,
  },
  {
    name: "Edge Runtime",
    description: "Deploy globally with minimal latency",
    icon: Server,
  },
  {
    name: "Hono",
    description: "Ultra-fast web framework for modern runtimes",
    icon: Cog,
  },
  {
    name: "TypeScript",
    description: "Write safer, more maintainable code",
    icon: Terminal,
  },
  {
    name: "Node.js",
    description: "Built on the powerful V8 JavaScript engine",
    icon: Layers,
  },
  {
    name: "Drizzle ORM",
    description: "Next-generation TypeScript ORM",
    icon: Database,
  },
]

const Technologies = () => {
  return (
    <section className="w-full bg-gray-50 py-12 dark:bg-gray-900 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Cutting Edge Stack
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl">
              Built with the latest technologies to ensure the best performance
              and developer experience.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="border-none shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <tech.icon className="size-6 text-purple-500" />
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tech.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technologies
