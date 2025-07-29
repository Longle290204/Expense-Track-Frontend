import React, { useState, useEffect } from 'react'
import { Member } from './types'
import { GroupDetailProps } from './types'

// Styles
import { textStyles } from '~/styles/textStyles'

// icon
import { MdOutlineShoppingCart } from 'react-icons/md'
import { MdOutlineGroups2 } from 'react-icons/md'
import { AiOutlineDashboard } from 'react-icons/ai'
import { CiSettings } from 'react-icons/ci'

// Components
import MemberTab from './MemberTab'

// API
import { getUserInGroup, addUserToGroup } from '~/api/group/groupApi'

const GroupDetail: React.FC<GroupDetailProps> = ({ open, onClose, groupName = 'Gia đình', groupId }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'expenses' | 'roles' | 'settings'>('overview')
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [newMemberRole, setNewMemberRole] = useState<string>('member')

  const [showRoleModal, setShowRoleModal] = useState(false)
  const [editingRole, setEditingRole] = useState<any>(null)
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  })

  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch members from API
  useEffect(() => {
    const fetchMembers = async () => {
      if (groupId && open) {
        setLoading(true)
        try {
          const response = await getUserInGroup(groupId)
          setMembers(response || [])
        } catch (error) {
          console.error('Error fetching members:', error)
          setMembers([])
        } finally {
          setLoading(false)
        }
      }
    }

    fetchMembers()
  }, [groupId, open])

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'member':
        return 'bg-blue-100 text-blue-800'
      case 'viewer':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên'
      case 'member':
        return 'Thành viên'
      case 'viewer':
        return 'Người xem'
      default:
        return 'Không xác định'
    }
  }

  const handleAddMember = async () => {
    if (newMemberEmail.trim() && groupId) {
      try {
        // Tìm userId từ email (hoặc nhận userId từ form)
        // Tạm thời dùng email làm userId, bạn có thể thay đổi logic này
        const userId = newMemberEmail // Hoặc logic tìm userId từ email
        
        await addUserToGroup(userId, groupId)
        
        // Refresh members list
        const response = await getUserInGroup(groupId)
        setMembers(response || [])
        
        setNewMemberEmail('')
        setShowAddMember(false)
        console.log('Member added successfully')
      } catch (error) {
        console.error('Error adding member:', error)
        // Có thể thêm toast notification ở đây
      }
    }
  }

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMembers(members.map((member) => (member.id === memberId ? { ...member, role: newRole } : member)))
  }

  const removeMember = (memberId: string) => {
    setMembers(members.filter((member) => member.id !== memberId))
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

  const handlePermissionToggle = (permissionId: string) => {
    setRoleFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  if (!open) return null

  return (
    <div className='absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
      <div className='bg-white w-full h-full overflow-hidden flex flex-col'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold'>{groupName}</h1>
            <p className={`${textStyles.tab} text-blue-100 mt-1`}>
              {loading ? 'Đang tải...' : `${members.length} thành viên`}
            </p>
          </div>
          <button
            onClick={onClose}
            className='text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors'
          >
            <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className='border-b border-gray-200 bg-gray-50'>
          <nav className='flex space-x-8 px-6'>
            {[
              { key: 'overview', label: 'Tổng quan', icon: <AiOutlineDashboard /> },
              { key: 'members', label: 'Thành viên', icon: <MdOutlineGroups2 /> },
              { key: 'expenses', label: 'Chi tiêu', icon: <MdOutlineShoppingCart /> },
              { key: 'roles', label: 'Vai trò', icon: <CiSettings /> },
              { key: 'settings', label: 'Cài đặt', icon: <CiSettings /> }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-semibold text-xl transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className='mr-2 text-3xl'>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-auto p-6'>
          {activeTab === 'overview' && (
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg'>
                  <h3 className={textStyles.heading}>Tổng chi tiêu</h3>
                  <p className='text-3xl font-bold mt-2'>4.800.000 ₫</p>
                </div>
                <div className='bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg'>
                  <h3 className='text-lg font-semibold'>Chi tiêu tháng này</h3>
                  <p className='text-3xl font-bold mt-2'>1.200.000 ₫</p>
                </div>
                <div className='bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-lg'>
                  <h3 className='text-lg font-semibold'>Số giao dịch</h3>
                  <p className='text-3xl font-bold mt-2'>156</p>
                </div>
              </div>

              <div className='bg-white border rounded-lg p-6'>
                <h3 className={`${textStyles.tab} mb-4`}>Hoạt động gần đây</h3>
                <div className='space-y-4'>
                  {[
                    {
                      user: 'Nguyễn Văn A',
                      action: 'thêm chi tiêu',
                      amount: '150.000 ₫',
                      time: '2 giờ trước',
                      category: 'Ăn uống'
                    },
                    {
                      user: 'Trần Thị B',
                      action: 'thêm chi tiêu',
                      amount: '80.000 ₫',
                      time: '5 giờ trước',
                      category: 'Di chuyển'
                    },
                    { user: 'Lê Văn C', action: 'xem báo cáo', amount: '', time: '1 ngày trước', category: '' }
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0'
                    >
                      <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
                          <span className={`${textStyles.body} text-sm font-medium`}>{activity.user.charAt(0)}</span>
                        </div>
                        <div>
                          <p className={textStyles.heading}>
                            <span className='font-medium'>{activity.user}</span> {activity.action}
                            {activity.amount && (
                              <span className='text-green-600 font-semibold'> {activity.amount}</span>
                            )}
                            {activity.category && <span className='text-gray-500'> - {activity.category}</span>}
                          </p>
                          <p className={`${textStyles.tab} text-gray-500`}>{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <MemberTab
              members={members}
              setMembers={setMembers}
              availableRoles={availableRoles}
              showAddMember={showAddMember}
              setShowAddMember={setShowAddMember}
              newMemberEmail={newMemberEmail}
              setNewMemberEmail={setNewMemberEmail}
              newMemberRole={newMemberRole}
              setNewMemberRole={setNewMemberRole}
              handleAddMember={handleAddMember}
              handleRoleChange={handleRoleChange}
              removeMember={removeMember}
              getRoleColor={getRoleColor}
              getRoleText={getRoleText}
            />
          )}

          {activeTab === 'expenses' && (
            <div className='space-y-6'>
              <h2 className='text-2xl font-bold'>Chi tiêu nhóm</h2>
              <div className='bg-white border rounded-lg p-6'>
                <p className='text-gray-500 text-center py-8'>Chức năng chi tiêu đang được phát triển...</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className='space-y-6'>
              <h2 className='text-2xl font-bold'>Cài đặt nhóm</h2>
              <div className='bg-white border rounded-lg p-6'>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Tên nhóm</label>
                    <input
                      type='text'
                      defaultValue={groupName}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Mô tả</label>
                    <textarea
                      rows={3}
                      placeholder='Mô tả về nhóm...'
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                  <div className='flex justify-end space-x-3 pt-4'>
                    <button className='px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
                      Hủy
                    </button>
                    <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GroupDetail
