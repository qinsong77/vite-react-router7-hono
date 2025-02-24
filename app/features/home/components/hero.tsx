import { ArrowRight, Code, Star, Zap } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { siteConfig } from '~/constant'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 dark:from-purple-950/80 dark:via-purple-900/80 dark:to-indigo-950/80">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12 text-center sm:py-20 md:px-6">
        <div className="flex items-center justify-center">
          <span className="flex h-[30px] items-center space-x-2 rounded-full bg-white/10 px-4 py-1 text-sm">
            <Star className="size-4 text-yellow-300" />
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
            asChild
            variant="outline"
            size="lg"
            className="text-purple-500 hover:text-purple-600"
          >
            <a
              href={siteConfig.links.repoGithub}
              target="_blank"
              rel="noreferrer"
            >
              Quick Start
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-purple-500 hover:text-purple-600"
          >
            <a
              href={siteConfig.links.repoGithub}
              target="_blank"
              rel="noreferrer"
            >
              <Code className="mr-2 size-4" />
              View on GitHub
            </a>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:mt-20">
          <div className="flex flex-col items-center rounded-lg bg-white/10 px-8 py-4 backdrop-blur-sm">
            <Zap className="size-8 text-yellow-400" />
            <span className="mt-3 font-medium text-white">Lightning Fast</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/10 px-8 py-4 backdrop-blur-sm">
            <Code className="size-8 text-green-400" />
            <span className="mt-3 font-medium text-white">Type Safe</span>
          </div>
          <div className="col-span-2 flex flex-col items-center rounded-lg bg-white/10 px-8 py-4 backdrop-blur-sm md:col-span-1">
            <ArrowRight className="size-8 text-blue-400" />
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
