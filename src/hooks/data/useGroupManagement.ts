import { useState, useEffect } from 'react'
import { createGroup, getGroupsUser, updateGroup } from '~/api/group/groupApi'
import { GroupTypes } from '~/pages/group/types'

export const useGroupManagement = () => {
  const [groupName, setGroupName] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const [groups, setGroups] = useState<GroupTypes[]>([])
  const [openGroupDetail, setOpenGroupDetail] = useState<boolean>(false)

  // Update group
  const [openEditModal, setOpenEditModal] = useState(false)
  const [groupId, setGroupId] = useState<string>('')
  const [newGroupName, setNewGroupName] = useState<string>('')

  const handleOpenEdit = (group: any) => {
    setOpenEditModal(true)
  }

  const handleCloseEdit = () => {
    setOpenEditModal(false)
  }
  // Fetch groups
  const fetchGroups = async () => {
    try {
      const data = await getGroupsUser()
      setGroups(data)
    } catch (err) {
      console.error('Lỗi lấy nhóm:', err)
    }
  }

  useEffect(() => {
    fetchGroups()
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
      await fetchGroups() // Refresh danh sách
      handleClose()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleUpdateGroup = async (groupId: string, newGroupName: string) => {
    try {
      await updateGroup(groupId, newGroupName)
      await fetchGroups() // Refresh danh sách sau khi update
      console.log('Group updated successfully')
    } catch (error) {
      console.log('Error update group', error)
    }
  }

  return {
    // States
    groupName,
    setGroupName,
    open,
    groups,
    openGroupDetail,
    setOpenGroupDetail,

    // handle update group
    groupId,
    setGroupId,
    newGroupName,
    setNewGroupName,
    openEditModal,
    handleOpenEdit,
    handleCloseEdit,

    // Actions
    handleClose,
    handleClickOpen,
    handleCreateGroup,
    fetchGroups,
    handleUpdateGroup
  }
}
