import { Menu } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router"
import { ThemeSwitcher } from "~/components/theme-switcher"
import { Button } from "~/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"

// https://www.nico.fyi/blog/tailwind-css-group-modifier-to-prevent-react-rerender
const menuItems = [
  { name: "Home", href: "/" },
  { name: "Streaming", href: "/streaming" },
  { name: "About", href: "/about" },
  { name: "Client Page", href: "/client-page" },
]

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <NavLink
            to="/"
            className="mr-6 flex items-center space-x-2 font-bold hover:text-primary"
          >
            Full Stack Starter
          </NavLink>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group relative transition-colors hover:text-foreground/80 ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  }`
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
          <SheetContent side="left" className="pr-0">
            <nav className="grid gap-6 text-lg font-medium">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center transition-colors hover:text-foreground/80 ${
                      isActive ? "text-foreground" : "text-foreground/60"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <span className="ml-2 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-4" />
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <ThemeSwitcher className="ml-auto" />
      </div>
    </header>
  )
}
