import React, { useEffect, useState } from 'react'
// import Button from '../../components/common/button'
import { formatDate } from '~/utils/validation/date.util'
import { createGroup } from '~/api/group/groupApi'
import { getGroupsUser } from '~/api/group/groupApi'
import { GroupTypes } from './types'
// Library
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

function Group() {
  const [groupName, setGroupName] = useState('')
  const [open, setOpen] = useState(false)
  const [groups, setGroups] = useState<GroupTypes[]>([])

  // Lấy danh sách nhóm
  useEffect(() => {
    const getAllGroupUser = async () => {
      try {
        const data = await getGroupsUser()
        setGroups(data)
      } catch (err) {
        console.error('Lỗi lấy nhóm:', err)
      }
    }

    getAllGroupUser()
  }, [])

  const handleClose = () => {
    setOpen(false)
    setGroupName('')
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCreateGroup = async () => {
    try {
      await createGroup(groupName)
    } catch (error: any) {
      console.log(error.message)
    }

    handleClose()
  }

  return (
    <div className='h-full flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-bold text-gray-800'>Quản lý nhóm</h1>
        <Button variant='contained' className='flex items-center' onClick={handleClickOpen}>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 mr-2' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
              clipRule='evenodd'
            />
          </svg>
          <p className='text-2xl'>Tạo nhóm</p>
        </Button>
        <Dialog
          slotProps={{
            paper: {
              sx: {
                width: '30%',
                maxWidth: 'none'
              }
            }
          }}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle sx={{ fontSize: '17px' }}>Tạo nhóm</DialogTitle>
          <DialogContent>
            <TextField
              id='standard-basic'
              variant='standard'
              autoFocus
              margin='dense'
              label='Tên nhóm'
              fullWidth
              slotProps={{
                inputLabel: { sx: { fontSize: '16px' } },
                input: { sx: { height: '30px', fontSize: '16px' } }
              }}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ fontSize: '13px' }}>
              Hủy
            </Button>
            <Button
              onClick={handleCreateGroup}
              disabled={!groupName.trim()} // không cho bấm khi chưa nhập
              sx={{ fontSize: '13px' }}
            >
              Tạo nhóm
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className='flex-1 overflow-auto'>
        {groups.length > 0 ? (
          <div className='grid grid-cols-4 gap-6'>
            {groups.map((group, index) => (
              <div
                key={`${group.group_id}-${index}`}
                className='border bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer'
              >
                <div className='w-full bg-amber-500'>
                  <img src='' alt='' />
                </div>
                <div className='flex justify-between items-start mb-4'>
                  <h3 className='text-2xl font-semibold text-gray-800 truncate'>{group.group_name}</h3>
                  <button className='text-gray-400 hover:text-gray-600 ml-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-7 w-7 cursor-pointer'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
                    </svg>
                  </button>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 mr-2'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <span className='text-xl'>thành viên</span>
                  </div>
                  <div className='flex items-center text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 mr-2'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                        clipRule='evenodd'
                      />
                    </svg>
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
    </div>
  )
}

export default Group
