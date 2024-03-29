import { Navigate, RouteObject } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { ErrorPage } from '@/pages/ErrorPage'
import { TaskListPage } from '@/pages/tasks/TaskListPage'
import { NewTaskPage } from '@/pages/tasks/NewTaskPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { AuthLayout, LoginForm, SignupForm } from '@/features/authentication/index'
import { myJobListingsRoute } from './pages/jobs/my-listings'
import { editJobListingRoute } from './pages/jobs/edit'
import { NewJobListingPage } from './pages/jobs/NewJobListingPage'

export const routes: RouteObject[] = [
  {
    path: '/',
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
            path: 'tasks',
            children: [
              { index: true, element: <TaskListPage /> },
              { path: 'new', element: <NewTaskPage /> },
            ],
          },
          {
            path: 'jobs',
            children: [
              { path: 'my-listings', ...myJobListingsRoute },
              { path: 'new', element: <NewJobListingPage /> },
              { path: ':id/edit', ...editJobListingRoute },
            ],
          },
          {
            element: <AuthLayout />,
            children: [
              { path: 'login', element: <LoginForm /> },
              { path: 'signup', element: <SignupForm /> },
            ],
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
