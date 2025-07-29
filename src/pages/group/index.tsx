import React, { useEffect, useState } from 'react'
// import Button from '../../components/common/button'
import { formatDate } from '~/utils/validation/date.util'
import ModalCreateGroup from './ModalCreateGroup'
import { useGroupManagement } from '~/hooks/data/useGroupManagement'
import ModalEditGroup from './ModalEditGroup'
import GroupDetail from './GroupDetail'
import { GroupTypes } from './types'

function Group() {
  const {
    groupName,
    setGroupName,
    open,
    groups,
    openGroupDetail,
    setOpenGroupDetail,
    handleClose,
    handleClickOpen,
    handleCreateGroup,
    handleUpdateGroup
  } = useGroupManagement()

  // Local state for edit modal
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editingGroup, setEditingGroup] = useState<GroupTypes | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<GroupTypes | null>(null)

  return (
    <div className='relative h-full flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-bold text-gray-800'>Quản lý nhóm</h1>
        <ModalCreateGroup
          open={open}
          onClose={handleClose}
          groupName={groupName}
          setGroupName={setGroupName}
          onCreateGroup={handleCreateGroup}
          onOpen={handleClickOpen}
        />
      </div>

      <div className='flex-1 overflow-auto'>
        {groups.length > 0 ? (
          <div className='grid grid-cols-4 gap-6'>
            {groups.map((group, index) => (
              <div
                key={`${group.group_id}-${index}`}
                className='border bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer'
                onClick={() => {
                  setSelectedGroup(group)
                  setOpenGroupDetail(true)
                }}
              >
                <div className='w-full bg-amber-500'>
                  <img src='' alt='' />
                </div>
                <div className='flex justify-between items-start mb-4'>
                  <h3 className='text-2xl font-semibold text-gray-800 truncate'>{group.group_name}</h3>
                  <div onClick={(e) => e.stopPropagation()}>
                    <ModalEditGroup
                      open={openEditModal && editingGroup?.group_id === group.group_id}
                      onClose={() => {
                        console.log('Closing modal')
                        setOpenEditModal(false)
                        setEditingGroup(null)
                      }}
                      onOpen={() => {
                        console.log('Opening modal for group:', group)
                        setEditingGroup(group)
                        setOpenEditModal(true)
                      }}
                      groupId={group.group_id}
                      currentGroupName={group.group_name}
                      onEditGroup={handleUpdateGroup}
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center text-gray-600'>
                    <span className='text-xl'>thành viên</span>
                  </div>
                  <div className='flex items-center text-gray-600'>
                    <span className='text-xl'>{formatDate(group.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center h-64 text-gray-500'>
            <div className='text-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 mx-auto mb-4 text-gray-300'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <p>Chưa có nhóm nào. Hãy tạo nhóm mới để bắt đầu.</p>
            </div>
          </div>
        )}
      </div>

      <GroupDetail 
        open={openGroupDetail} 
        onClose={() => {
          setOpenGroupDetail(false)
          setSelectedGroup(null)
        }} 
        groupName={selectedGroup?.group_name || 'Gia đình'}
        groupId={selectedGroup?.group_id}
      />
    </div>
  )
}

export default Group
