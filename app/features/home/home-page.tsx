import CallToAction from './components/call-to-action'
import Features from './components/features'
import Hero from './components/hero'
import ServerInfoCard from './components/server-info-card'
import Technologies from './components/technologies'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServerInfoCard />
      <Technologies />
      <Features />
      <CallToAction />
    </div>
  )
}

export default HomePage
