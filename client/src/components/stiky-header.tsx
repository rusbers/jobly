import { cn } from "@/utils/shadcnUtils"
import { HTMLAttributes } from "react"

type AppHeaderProps = HTMLAttributes<HTMLDivElement>

export function StikyHeader({ className, children }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky z-[100] inset-x-0 top-0 py-4 border-b dark:bg-slate-950/80 bg:white/80 backdrop-blur-lg transition-all",
        className
      )}
    >
      {children}
    </header>
  )
}
