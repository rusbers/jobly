import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { Moon, Sun, Menu, ChevronDown } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { cn } from '@/utils/shadcnUtils'
import { Link } from 'react-router-dom'

const MAIN_NAV_LINKS = [
  {
    label: 'Task Board',
    path: '#',
  },
  {
    label: 'Job Listings',
    path: '#',
  },
]

const USER_NAV_LINKS = [
  {
    label: 'My Listings',
    path: '#',
  },
]

type MainNavbarProps = HTMLAttributes<HTMLDivElement>

export default function MainNavbar({ className }: MainNavbarProps) {
  const userEmail = 'test@test.com'
  return (
    <nav className={cn('flex flex-wrap items-center justify-between py-4 border-b', className)}>
      <a className='text-2xl' href='/'>
        WDS App
      </a>
      <div className='flex flex-wrap gap-4'>
        <ThemeToggleButton />

        <NavMenu email={userEmail} />

        <MobileNavMenu email={userEmail} />
      </div>
    </nav>
  )
}

function NavMenu({ email }: { email: string }) {
  return (
    <>
      <ul className={'hidden md:flex flex-wrap gap-4'}>
        {MAIN_NAV_LINKS.map((item, index) => (
          <li key={index}>
            <Button asChild variant={'ghost'}>
              <Link to={item.path}>{item.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
      <div className={'hidden md:block'}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'}>
              {email}
              <ChevronDown className='size-4 ml-2' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5} alignOffset={-5}>
            {USER_NAV_LINKS.map((link, index) => (
              <DropdownMenuItem asChild key={index}>
                <Link to={link.path}>{link.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-600'>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

function MobileNavMenu({ email }: { email: string }) {
  return (
    <div className='md:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant={'ghost'}>
            <Menu aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {MAIN_NAV_LINKS.map((link, index) => (
            <DropdownMenuItem key={index}>
              <Link to={link.path}>{link.label}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger asChild>
              <span className='mr-auto'>{email}</span>
              <ChevronDown className='size-4 ml-2' />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent sideOffset={5} alignOffset={-5}>
              {USER_NAV_LINKS.map((link, index) => (
                <DropdownMenuItem asChild key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-red-600'>Logout</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function ThemeToggleButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <Moon aria-hidden />
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
