import { useState } from 'react'

export default function RoleModal() {
  // Available permissions
  const availablePermissions = [
    { id: 'view_expenses', name: 'Xem chi tiêu', description: 'Có thể xem danh sách chi tiêu' },
    { id: 'add_expenses', name: 'Thêm chi tiêu', description: 'Có thể thêm chi tiêu mới' },
    { id: 'edit_expenses', name: 'Sửa chi tiêu', description: 'Có thể chỉnh sửa chi tiêu' },
    { id: 'delete_expenses', name: 'Xóa chi tiêu', description: 'Có thể xóa chi tiêu' },
    { id: 'manage_members', name: 'Quản lý thành viên', description: 'Có thể thêm/xóa thành viên' },
    { id: 'manage_roles', name: 'Quản lý vai trò', description: 'Có thể tạo/sửa vai trò' }
  ]

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

  // Role editing modal state
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [editingRole, setEditingRole] = useState<any>(null)
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  })

  const handlePermissionToggle = (permissionId: string) => {
    setRoleFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const handleSaveRole = () => {
    if (editingRole) {
      // Update existing role
      setAvailableRoles(
        availableRoles.map((role) => (role.id === editingRole.id ? { ...role, ...roleFormData } : role))
      )
    } else {
      // Create new role
      const newRole = {
        id: Date.now().toString(),
        color: 'bg-purple-100 text-purple-800',
        ...roleFormData
      }
      setAvailableRoles([...availableRoles, newRole])
    }
    setShowRoleModal(false)
    setEditingRole(null)
    setRoleFormData({ name: '', description: '', permissions: [] })
  }

  return (
    <div>
      {showRoleModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-[500px] max-h-[600px] overflow-y-auto'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-bold'>
                {editingRole ? `📝 Chỉnh sửa vai trò: ${editingRole.name}` : 'Tạo vai trò mới'}
              </h3>
              <button onClick={() => setShowRoleModal(false)} className='text-gray-400 hover:text-gray-600'>
                ✕
              </button>
            </div>

            <div className='space-y-6'>
              {/* Basic Info */}
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Tên vai trò</label>
                  <input
                    type='text'
                    placeholder='Ví dụ: Moderator, Editor...'
                    value={roleFormData.name}
                    onChange={(e) => setRoleFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Mô tả</label>
                  <input
                    type='text'
                    placeholder='Mô tả vai trò và chức năng...'
                    value={roleFormData.description}
                    onChange={(e) => setRoleFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              {/* Permission Assignment */}
              <div>
                <div className='flex items-center justify-between mb-3'>
                  <h4 className='font-medium text-gray-900'>Gắn quyền hạn tùy chỉnh</h4>
                  <span className='text-sm text-gray-500'>
                    Đã chọn: {roleFormData.permissions.length}/{availablePermissions.length}
                  </span>
                </div>

                <div className='bg-gray-50 rounded-lg p-3 mb-3'>
                  <p className='text-sm text-gray-600'>
                    💡 <strong>Hướng dẫn:</strong> Tích chọn các quyền hạn mà vai trò này có thể thực hiện. Bạn có thể
                    tùy chỉnh bất kỳ tổ hợp quyền nào.
                  </p>
                </div>

                <div className='space-y-3 max-h-64 overflow-y-auto border rounded-lg p-3'>
                  {availablePermissions.map((perm) => (
                    <label
                      key={perm.id}
                      className={`flex items-start space-x-3 cursor-pointer p-3 rounded-lg border transition-all ${
                        roleFormData.permissions.includes(perm.id)
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type='checkbox'
                        checked={roleFormData.permissions.includes(perm.id)}
                        onChange={() => handlePermissionToggle(perm.id)}
                        className='mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500'
                      />
                      <div className='flex-1'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-sm font-medium text-gray-900'>{perm.name}</span>
                          {roleFormData.permissions.includes(perm.id) && (
                            <span className='text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full'>
                              ✓ Đã chọn
                            </span>
                          )}
                        </div>
                        <p className='text-xs text-gray-500 mt-1'>{perm.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center mt-6 pt-4 border-t'>
              <div className='text-sm text-gray-500'>
                {roleFormData.permissions.length === 0 && (
                  <span className='text-amber-600'>⚠️ Chưa chọn quyền nào</span>
                )}
              </div>
              <div className='flex space-x-3'>
                <button
                  onClick={() => setShowRoleModal(false)}
                  className='px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveRole}
                  disabled={!roleFormData.name.trim()}
                  className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                >
                  {editingRole ? '💾 Cập nhật vai trò' : '✨ Tạo vai trò'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
