import {
  Clock,
  GithubIcon,
  LogOut,
  Menu,
  RssIcon,
  UserRoundPlus,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router'

import { ThemeSwitcher } from '~/components/theme-switcher'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button, buttonVariants } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import { siteConfig } from '~/constant'
import { ApiClient } from '~/endpoint'
import { useRootLoaderData } from '~/hooks/route-loader-data/use-root-loader-data'
import { cn } from '~/lib/utils'

// https://www.nico.fyi/blog/tailwind-css-group-modifier-to-prevent-react-rerender
const menuItems = [
  { name: 'Streaming', href: '/streaming' },
  { name: 'Client Page', href: '/client-page' },
  { name: 'About', href: '/about' },
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
                    isActive ? 'text-foreground' : 'text-foreground/60'
                  } ${isPending ? 'animate-pulse text-primary/70 opacity-50' : ''}`
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
              <Menu className="size-5" />
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
                      isActive ? 'text-foreground' : 'text-foreground/60'
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
        <div className="mx-2 ml-auto flex items-center">
          <AuthButton />
          <NavLink
            to={siteConfig.links.repoGithub}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'w-9 px-0',
              )}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
              <GithubIcon className="size-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </NavLink>
          <NavLink
            to={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'w-9 px-0',
              )}
            >
              <RssIcon className="size-3 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </NavLink>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}

function AuthButton() {
  const { userInfo } = useRootLoaderData()
  if (userInfo) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="mr-2 size-7 hover:cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>signed in</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>signed in</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Hello</span>
                <span className="truncate text-xs">{userInfo.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserRoundPlus />
              Created at:
              <span className="text-sm">
                {new Date(userInfo.createdAt).toLocaleDateString()}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Clock />
              Last Sign In:
              <span className="text-sm">
                {new Date(userInfo.lastSignInAt).toLocaleDateString()}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={async () => {
              await ApiClient.api.auth.logout.$post()
              window.location.reload()
            }}
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  return (
    <NavLink
      to="/sign-in"
      className={({ isActive }) =>
        `mr-2 inline-flex items-center transition-colors hover:text-foreground/80 ${
          isActive ? 'text-foreground' : 'text-foreground/60'
        }`
      }
    >
      Sign In
    </NavLink>
  )
}
