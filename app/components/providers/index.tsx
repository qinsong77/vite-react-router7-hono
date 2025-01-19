'use client'

import { ThemeProvider } from './theme-provider'

// import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/*<TooltipProvider>{children}</TooltipProvider>*/}
      {children}
    </ThemeProvider>
  )
}
