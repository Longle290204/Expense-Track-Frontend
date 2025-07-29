import { PropTypes } from '~/types/interfaces/props'
import Sidebar from '~/components/layout/sidebar'

function DashboardLayout({ children }: PropTypes) {
  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <Sidebar />
      <main className='flex-1 overflow-auto p-8'>{children}</main>
    </div>
  )
}

export default DashboardLayout
