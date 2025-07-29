import { RouteItem } from '../types/interfaces/router.js'

import LoginPage from '../pages/auth/login/LoginPage.js'
import DashboardLayout from '~/layouts/main/dashboard-layout/index.js'
import Dashboard from '~/pages/dashboard/index.js'
import Group from '~/pages/group/index.js'

const publicRoutes: RouteItem[] = [
  { path: '/login', element: LoginPage },
  { path: '/dashboard', element: Dashboard, layout: DashboardLayout },
  { path: '/group', element: Group, layout: DashboardLayout }
]

export { publicRoutes }
