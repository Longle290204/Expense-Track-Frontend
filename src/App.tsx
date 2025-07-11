// React libraries
import { ComponentType, ReactNode, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Component
import DefaultLayout from './layouts/main/default-layout/DefaultLayout'
import { publicRoutes } from './router/router'

import { RouteItem } from './types/interfaces/router'

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route: RouteItem, index: number) => {
          const Page = route.element
          let Layout: ComponentType<{ children: ReactNode }> = DefaultLayout
          if (route.layout === null) {
            Layout = Fragment
          } else if (route.layout) {
            Layout = route.layout
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}
      </Routes>
    </Router>
  )
}

export default App
