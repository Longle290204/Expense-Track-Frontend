import { useState } from 'react'
// Component
import RoleModal from './RoleModal'

export default function RoleTab() {
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [editingRole, setEditingRole] = useState<any>(null)
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  })

  // Available permissions
  const availablePermissions = [
    { id: 'view_expenses', name: 'Xem chi tiêu', description: 'Có thể xem danh sách chi tiêu' },
    { id: 'add_expenses', name: 'Thêm chi tiêu', description: 'Có thể thêm chi tiêu mới' },
    { id: 'edit_expenses', name: 'Sửa chi tiêu', description: 'Có thể chỉnh sửa chi tiêu' },
    { id: 'delete_expenses', name: 'Xóa chi tiêu', description: 'Có thể xóa chi tiêu' },
    { id: 'manage_members', name: 'Quản lý thành viên', description: 'Có thể thêm/xóa thành viên' },
    { id: 'manage_roles', name: 'Quản lý vai trò', description: 'Có thể tạo/sửa vai trò' }
  ]

  // Available roles with permissions
  const [availableRoles, setAvailableRoles] = useState([
    {
      id: 'admin',
      name: 'Admin',
      description: 'Quản trị viên - Toàn quyền',
      color: 'bg-red-100 text-red-800',
      permissions: [
        'view_expenses',
        'add_expenses',
        'edit_expenses',
        'delete_expenses',
        'manage_members',
        'manage_roles'
      ]
    },
    {
      id: 'member',
      name: 'Member',
      description: 'Thành viên - Thêm/sửa chi tiêu',
      color: 'bg-blue-100 text-blue-800',
      permissions: ['view_expenses', 'add_expenses', 'edit_expenses']
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Người xem - Chỉ xem',
      color: 'bg-gray-100 text-gray-800',
      permissions: ['view_expenses']
    }
  ])
  // Role management functions
  const handleEditRole = (role: any) => {
    setEditingRole(role)
    setRoleFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    })
    setShowRoleModal(true)
  }
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Quản lý vai trò</h2>
        <button
          onClick={() => {
            setEditingRole(null)
            setRoleFormData({ name: '', description: '', permissions: [] })
            setShowRoleModal(true)
          }}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 shadow-sm'
        >
          <span>✨</span>
          <span>Tạo vai trò tùy chỉnh</span>
        </button>
      </div>

      <div className='bg-white border rounded-lg overflow-hidden'>
        <div className='grid grid-cols-12 bg-gray-50 py-3 px-4 text-sm font-medium text-gray-700'>
          <div className='col-span-3'>Tên vai trò</div>
          <div className='col-span-4'>Mô tả</div>
          <div className='col-span-3'>Quyền hạn</div>
          <div className='col-span-2'>Hành động</div>
        </div>

        <div className='divide-y divide-gray-200'>
          {availableRoles.map((role) => (
            <div key={role.id} className='grid grid-cols-12 py-4 px-4 hover:bg-gray-50'>
              <div className='col-span-3'>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${role.color}`}>{role.name}</span>
              </div>
              <div className='col-span-4 text-gray-600'>{role.description}</div>
              <div className='col-span-3'>
                <div className='flex flex-wrap gap-1'>
                  {role.permissions.map((permId) => {
                    const perm = availablePermissions.find((p) => p.id === permId)
                    return (
                      <span key={permId} className='bg-green-100 text-green-800 px-2 py-1 rounded text-xs'>
                        {perm?.name || permId}
                      </span>
                    )
                  })}
                </div>
              </div>
              <div className='col-span-2 flex space-x-2'>
                <button
                  onClick={() => handleEditRole(role)}
                  className='text-blue-600 hover:text-blue-800 text-sm px-2 py-1 border border-blue-300 rounded hover:bg-blue-50'
                >
                  📝 Chỉnh sửa quyền
                </button>
                {role.id !== 'admin' && (
                  <button className='text-red-600 hover:text-red-800 text-sm px-2 py-1 border border-red-300 rounded hover:bg-red-50'>
                    Xóa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <RoleModal />
    </div>
  )
}
