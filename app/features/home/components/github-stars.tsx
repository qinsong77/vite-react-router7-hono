"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

const popularRepos = [
  { name: "React", url: "https://github.com/facebook/react" },
  { name: "Vue", url: "https://github.com/vuejs/core" },
  { name: "Angular", url: "https://github.com/angular/angular" },
] as const

export default function GitHubStars({ stars }: { stars: number[] }) {
  return (
    <section className="w-full bg-gradient-to-br from-purple-50 to-blue-50 py-12 dark:from-gray-900 dark:to-gray-800 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Popular GitHub Repositories
          </h2>
          <p className="mt-4 max-w-[600px] text-gray-500 dark:text-gray-400">
            Check out these trending repositories and their star counts
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularRepos.map((repo, index) => (
            <Card
              key={repo.name}
              className="transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <span>{repo.name}</span>
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 flex items-center justify-center">
                      <svg
                        className="size-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Stars
                    </p>
                    <p className="mt-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent dark:from-purple-400 dark:to-blue-400">
                      {stars[index].toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-lg text-red-500">
          Above starts data are get by loader on the server!
        </p>
      </div>
    </section>
  )
}
