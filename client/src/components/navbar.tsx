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

const MAIN_NAV_LINKS = [
  {
    label: "Task Board",
    path: "#",
  },
  {
    label: "Job Listings",
    path: "#",
  },
]

const USER_NAV_LINKS = [
  {
    label: "My Listings",
    path: "#",
  },
]

type MainNavbarProps = HTMLAttributes<HTMLDivElement>

export default function MainNavbar({ className }: MainNavbarProps) {
  const { isLoggedIn, email } = { isLoggedIn: true, email: "test@test.com" }

  return (
    <nav className={cn("flex flex-wrap items-center justify-between py-4 border-b", className)}>
      <a className='text-2xl' href='/'>
        WDS App
      </a>
      <div className='flex flex-wrap gap-4'>
        <ThemeToggleButton />

        <NavMenu isLoggedIn={isLoggedIn} email={email} />

        <MobileNavMenu isLoggedIn={isLoggedIn} email={email} />
      </div>
    </nav>
  )
}

function NavMenu({ isLoggedIn, email }: { isLoggedIn: boolean; email: string }) {
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
        ) : (
          <Button variant={"ghost"}>Login</Button>
        )}
      </div>
    </>
  )
}

function MobileNavMenu({ isLoggedIn, email }: { isLoggedIn: boolean; email: string }) {
  return (
    <div className='md:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Menu aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {MAIN_NAV_LINKS.map((link, index) => (
            <DropdownMenuItem key={index}>
              <Link to={link.path}>{link.label}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {isLoggedIn ? (
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
          ) : (
            <DropdownMenuItem>Login</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
