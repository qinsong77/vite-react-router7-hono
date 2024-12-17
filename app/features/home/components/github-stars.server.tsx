"use server"

import { getRandomNumbers } from "~/endpoint"

import GitHubStars from "./github-stars"

export async function GitHubStarsServer() {
  const stars = await getRandomNumbers()

  return <GitHubStars stars={stars} />
}
