import { HTMLAttributes } from "react"
import { StikyHeader } from "./stiky-header"
import { MainNavbar } from "./main-navbar"

type AppHeaderProps = HTMLAttributes<HTMLDivElement>

export function AppHeader({ className }: AppHeaderProps) {
  return (
    <StikyHeader className={className}>
      <MainNavbar />
    </StikyHeader>
  )
}
