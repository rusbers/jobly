import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { THEME_OPTIONS } from '@/constants/constants'
import { useAuth } from '@/features/authentication'
import useTheme from '@/hooks/useTheme'
import { ChevronDown, Menu, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav className='sticky top-0 z-10 border-b p-4 bg-white dark:bg-slate-950'>
      <div className='container flex items-center justify-between gap-4'>
        <span className='text-lg'>Jobly</span>
        <div className='flex'>
          <ThemeToggleButton />
          <div className='hidden sm:flex'>
            <NavItem to='/tasks' label='Task Board' />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800'
                  >
                    <span className='mr-auto'>{user.email}</span>
                    <ChevronDown className='w-4 h-4 ml-2' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavItem to='/login' label='Login' />
            )}
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex sm:hidden' asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800'
                >
                  <Menu className='w-5 h-5' />
                  <span className='sr-only'>Mobile Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                  <Link to='/tasks'>Task Board</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user ? (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger asChild>
                      <span>{user.email}</span>
                      <ChevronDown className='w-4 h-4 ml-2' />
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to='/login'>Login</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
  const { setTheme } = useTheme()
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
        {THEME_OPTIONS.map((theme) => (
          <DropdownMenuItem className='capitalize' key={theme} onClick={() => setTheme(theme)}>
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
