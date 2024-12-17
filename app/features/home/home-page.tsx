import CallToAction from "./components/call-to-action"
import Features from "./components/features"
import GitHubStars from "./components/github-stars"
import Hero from "./components/hero"
import Technologies from "./components/technologies"

const HomePage = ({ stars }: { stars: number[] }) => {
  return (
    <div>
      <Hero />
      <GitHubStars stars={stars} />
      <Technologies />
      <Features />
      <CallToAction />
    </div>
  )
}

export default HomePage
