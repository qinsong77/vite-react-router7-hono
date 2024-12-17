import { ArrowRight, Code, Star, Zap } from "lucide-react"
import { Button } from "~/components/ui/button"

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 dark:from-purple-950/80 dark:via-purple-900/80 dark:to-indigo-950/80">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12 text-center sm:py-20 md:px-6">
        <div className="flex items-center justify-center">
          <span className="flex h-[30px] items-center space-x-2 rounded-full bg-white/10 px-4 py-1 text-sm">
            <Star className="h-4 w-4 text-yellow-300" />
            <span className="text-white">New Release v1.0</span>
          </span>
        </div>
        <h1 className="mt-8 max-w-4xl text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Build Faster. Scale Better.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl">
          A modern full-stack starter template powered by React 19, Hono, and
          cutting-edge technologies. Build production-ready applications in
          minutes.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Button
            size="lg"
            className="bg-white text-purple-500 hover:bg-gray-100 hover:text-purple-600"
          >
            Quick Start
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-purple-500 hover:bg-gray-100 hover:text-purple-600"
          >
            <Code className="mr-2 h-4 w-4" />
            View on GitHub
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:mt-20">
          <div className="flex flex-col items-center rounded-lg bg-white/10 px-8 py-4 backdrop-blur-sm">
            <Zap className="h-8 w-8 text-yellow-400" />
            <span className="mt-3 font-medium text-white">Lightning Fast</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/10 px-8 py-4 backdrop-blur-sm">
            <Code className="h-8 w-8 text-green-400" />
            <span className="mt-3 font-medium text-white">Type Safe</span>
          </div>
          <div className="col-span-2 flex flex-col items-center rounded-lg bg-white/10 px-8 py-4 backdrop-blur-sm md:col-span-1">
            <ArrowRight className="h-8 w-8 text-blue-400" />
            <span className="mt-3 font-medium text-white">
              Production Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
