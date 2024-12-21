import { Footer } from "./footer"
import { Header } from "./header"

type LandingLayoutProps = {
  children: React.ReactNode
  withHeader?: boolean
  withFooter?: boolean
}

export function LandingLayout({
  children,
  withHeader = true,
  withFooter = true,
}: LandingLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      {withHeader && <Header />}
      <main className="flex-1">{children}</main>
      {withFooter && <Footer />}
    </div>
  )
}
