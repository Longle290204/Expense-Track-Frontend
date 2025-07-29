import React from 'react'
import { Member } from './types'
import { MemberTabProps } from './types'

// icon
import { FaPlus } from 'react-icons/fa6'

const MemberTab: React.FC<MemberTabProps> = ({
  members,
  setMembers,
  availableRoles,
  showAddMember,
  setShowAddMember,
  newMemberEmail,
  setNewMemberEmail,
  newMemberRole,
  setNewMemberRole,
  handleAddMember,
  handleRoleChange,
  removeMember,
  getRoleColor,
  getRoleText
}) => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Quản lý thành viên</h2>
        <button
          onClick={() => setShowAddMember(true)}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2'
        >
          <FaPlus />
          <span>Thêm thành viên</span>
        </button>
      </div>

      {showAddMember && (
        <div className='bg-gray-50 p-4 rounded-lg border'>
          <h3 className='text-lg font-semibold mb-4'>Thêm thành viên mới</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <input
              type='email'
              placeholder='Email thành viên'
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <select
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {availableRoles
                .filter((role) => role.id !== 'admin')
                .map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.description}
                  </option>
                ))}
            </select>
            <div className='flex space-x-2'>
              <button
                onClick={handleAddMember}
                className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors'
              >
                Thêm
              </button>
              <button
                onClick={() => setShowAddMember(false)}
                className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors'
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='bg-white border rounded-lg overflow-hidden'>
        <div className='grid grid-cols-12 bg-gray-50 py-3 px-4 text-sm font-medium text-gray-700'>
          <div className='text-xl col-span-4'>Thành viên</div>
          <div className='text-xl col-span-2'>Vai trò</div>
          <div className='text-xl col-span-2'>Ngày tham gia</div>
          <div className='text-xl col-span-2'>Tổng chi tiêu</div>
          <div className='text-xl col-span-2'>Hành động</div>
        </div>

        <div className='divide-y divide-gray-200'>
          {members.map((member) => (
            <div key={member.id} className='grid grid-cols-12 py-4 px-4 hover:bg-gray-50 transition-colors'>
              <div className='col-span-4 flex items-center space-x-3'>
                <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-medium'>{member.name.charAt(0)}</span>
                </div>
                <div>
                  <p className='font-medium text-gray-900'>{member.name}</p>
                  <p className='text-xl text-gray-500'>{member.email}</p>
                </div>
              </div>
              <div className='col-span-2 flex items-center'>
                <span className={`px-2 py-1 rounded-full text-xl font-medium ${getRoleColor(member.role)}`}>
                  {getRoleText(member.role)}
                </span>
              </div>
              <div className='col-span-2 flex items-center text-gray-600'>
                {new Date(member.joinedAt).toLocaleDateString('vi-VN')}
              </div>
              <div className='col-span-2 flex items-center text-gray-900 font-medium'>
                {member.totalExpense.toLocaleString('vi-VN')} ₫
              </div>
              <div className='col-span-2 flex items-center space-x-2'>
                {member.role !== 'admin' && (
                  <>
                    <select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      className='text-xl px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    >
                      {availableRoles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeMember(member.id)}
                      className='text-red-600 hover:text-red-800 p-1 rounded transition-colors'
                    >
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MemberTab
