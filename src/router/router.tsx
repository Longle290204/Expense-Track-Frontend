import { RouteItem } from '../types/interfaces/router.js'

import LoginPage from '../pages/auth/login/LoginPage.js'

const publicRoutes: RouteItem[] = [{ path: '/login', element: LoginPage }]

export { publicRoutes }
