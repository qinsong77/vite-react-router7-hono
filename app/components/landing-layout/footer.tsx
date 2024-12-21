import { siteConfig } from "~/constant/site"
import { cn } from "~/lib/utils"

import { ExternalLink } from "../external-link"

export function Footer({ className }: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("py-2 pl-8 md:py-4", className)}>
      <p className="text-balance text-center text-xs leading-relaxed text-muted-foreground md:text-left md:text-sm">
        Basically built by{" "}
        <ExternalLink href="https://github.com/remix-run/react-router-templates/blob/main/node-custom-server">
          React Router V7:node-custom-server
        </ExternalLink>
        . The source code is available on{" "}
        <ExternalLink href={siteConfig.links.repoGithub}>GitHub</ExternalLink>.
      </p>
    </footer>
  )
}
