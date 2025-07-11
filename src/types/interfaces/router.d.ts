import { ComponentType, ReactNode } from 'react'

export interface RouteItem {
  path: string
  element: ComponentType
  layout?: ComponentType<{ children: ReactNode }> | null
}
