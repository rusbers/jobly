import { Navigate, RouteObject } from "react-router-dom"
import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import { AuthLayout } from "./features/auth"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to='/tasks' replace />,
          },
          {
            path: "tasks",
            children: [
              { index: true, element: <TaskListPage /> },
              { path: "new", element: <NewTaskPage /> },
            ],
          },
          {
            path: "auth",
            element: <AuthLayout />,
            children: [
              { index: true, element: <Navigate to='/auth/login' /> },
              { path: "login", element: <LoginPage /> },
              { path: "signup", element: <SignupPage /> },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
