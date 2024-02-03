import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav className='sticky top-0 z-10 border-b p-4 bg-white dark:bg-slate-950'>
      <div className='container flex items-center justify-between gap-4'>
        <span className='text-lg'>Jobly</span>
        <div className='flex'>
          <ThemeToggleButton />
          <NavItem to='/tasks' label='Task Board' />
        </div>
      </div>
    </nav>
  )
}

type NavItemProps = {
  to: string
  label: string
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <div>
      <Button asChild variant='ghost'>
        <Link to={to}>{label}</Link>
      </Button>
    </div>
  )
}

function ThemeToggleButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800'
        >
          <Sun className='h-5 w-5 scale-100 dark:skale-0 transition-transform' />
          <Moon className='h-5 w-5 scale-0 dark:skale-100 transition-transform absolute' />
          <span className='sr-only'>Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>Light</DropdownMenuItem>
        <DropdownMenuItem>Dark</DropdownMenuItem>
        <DropdownMenuItem>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
