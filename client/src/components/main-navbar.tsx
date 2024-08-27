import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Menu, ChevronDown } from "lucide-react"
import { HTMLAttributes } from "react"
import { cn } from "@/utils/shadcnUtils"
import { Link } from "react-router-dom"
import ThemeToggleButton from "./theme-toggle-button"
import { type User, useAuthContext } from "@/features/auth"

const MAIN_NAV_LINKS = [
  {
    label: "Task Board",
    path: "/",
  },
  {
    label: "Job Listings",
    path: "/job-listings",
  },
]

const USER_NAV_LINKS = [
  {
    label: "My Listings",
    path: "/job-listings/my-listings",
  },
]

type MainNavbarProps = HTMLAttributes<HTMLDivElement>

export function MainNavbar({ className }: MainNavbarProps) {
  const { isLoggedIn, user, logout } = useAuthContext()

  return (
    <nav className={cn("flex flex-wrap items-center justify-between", className)}>
      <Link className='text-2xl' to='/'>
        WDS App
      </Link>
      <div className='flex flex-wrap gap-4'>
        <ThemeToggleButton />

        <NavMenu isLoggedIn={isLoggedIn} user={user} logout={logout} />

        <MobileNavMenu isLoggedIn={isLoggedIn} user={user} logout={logout} />
      </div>
    </nav>
  )
}

type MenuCommonProps = {
  isLoggedIn: boolean
  user: User | undefined
  logout: () => Promise<void>
}

function NavMenu({ isLoggedIn, user, logout }: MenuCommonProps) {
  return (
    <>
      <ul className={"hidden md:flex flex-wrap gap-4"}>
        {MAIN_NAV_LINKS.map((item, index) => (
          <li key={index}>
            <Button asChild variant={"ghost"}>
              <Link to={item.path}>{item.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
      <div className={"hidden md:block"}>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                {user?.email}
                <ChevronDown className='size-4 ml-2' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='z-[100]' sideOffset={5} alignOffset={-5}>
              {USER_NAV_LINKS.map((link, index) => (
                <DropdownMenuItem asChild key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-red-600' onClick={logout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant={"ghost"}>
            <Link to='/auth/login'>Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

function MobileNavMenu({ isLoggedIn, user, logout }: MenuCommonProps) {
  return (
    <div className='md:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Menu aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='z-[100]' align='end'>
          {MAIN_NAV_LINKS.map((link, index) => (
            <DropdownMenuItem key={index}>
              <Link to={link.path}>{link.label}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {isLoggedIn ? (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger asChild>
                <span className='mr-auto'>{user?.email}</span>
                <ChevronDown className='size-4 ml-2' />
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className='z-[100]' sideOffset={5} alignOffset={-5}>
                {USER_NAV_LINKS.map((link, index) => (
                  <DropdownMenuItem asChild key={index}>
                    <Link to={link.path}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-red-600' onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem asChild>
              <Link to='/auth/login'>Login</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
