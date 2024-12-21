import { Menu } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router"
import { ThemeSwitcher } from "~/components/theme-switcher"
import { Button } from "~/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"

// https://www.nico.fyi/blog/tailwind-css-group-modifier-to-prevent-react-rerender
const menuItems = [
  { name: "Streaming", href: "/streaming" },
  { name: "About", href: "/about" },
  { name: "Client Page", href: "/client-page" },
]

const HomeNav = () => (
  <NavLink
    to="/"
    className="mr-6 flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-bold text-transparent hover:text-primary"
  >
    Full Stack Starter
  </NavLink>
)
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <HomeNav />
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive, isPending }) =>
                  `group relative transition-colors hover:text-foreground/80 ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  } ${isPending ? "animate-pulse text-primary/70 opacity-50" : ""}`
                }
              >
                {item.name}
                <span className="absolute -bottom-[21px] left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </NavLink>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] pr-0">
            <HomeNav />
            <nav className="mt-6 flex flex-col gap-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center py-2 text-base font-medium transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/60"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="mx-2 ml-auto">
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              `mr-4 inline-flex items-center transition-colors hover:text-foreground/80 ${
                isActive ? "text-foreground" : "text-foreground/60"
              }`
            }
          >
            Sign In
          </NavLink>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
