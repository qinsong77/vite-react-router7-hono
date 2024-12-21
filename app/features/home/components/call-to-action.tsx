import { BookOpen, Github } from "lucide-react"

import { Button } from "~/components/ui/button"

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-950/80 dark:to-indigo-950/80">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-32">
        <div className="flex flex-col items-center space-y-8 text-center">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tighter text-white sm:text-5xl">
            Start Building Your Next Big Thing Today
          </h2>
          <p className="max-w-[700px] text-lg text-gray-200 md:text-xl">
            Join thousands of developers who are already building amazing
            applications with our starter template.
          </p>
          <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-white text-purple-600 hover:bg-gray-100 sm:w-auto"
            >
              {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
              <Github className="mr-2 size-5" />
              Clone Repository
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-white text-purple-600 hover:bg-gray-100 sm:w-auto"
            >
              <BookOpen className="mr-2 size-5" />
              Read Documentation
            </Button>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 text-sm text-gray-200 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-white/10 px-4 py-1.5">
                MIT License
              </span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-white/10 px-4 py-1.5">
                TypeScript First
              </span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-white/10 px-4 py-1.5">
                Production Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
