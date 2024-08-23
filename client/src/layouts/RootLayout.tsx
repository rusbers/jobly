import { AppHeader } from "@/components/app-header"
import { Toaster } from "@/components/ui/toaster"
import { AuthContextProvider } from "@/features/auth"
import { Outlet, ScrollRestoration } from "react-router-dom"

export function RootLayout() {
  return (
    <AuthContextProvider>
      <div className='flex flex-col min-h-screen'>
        <AppHeader className='container' />

        <div className='container py-4 flex-grow grid grid-cols-1'>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <ScrollRestoration />
      <Toaster />
    </AuthContextProvider>
  )
}
