import api from '../../api/common/axiosInterceptor'

export const createGroup = async (groupName: String) => {
  const response = await api.post(`/api/group/create`, {
    group_name: groupName
  })

  return response.data
}

export const getGroupsUser = async () => {
  const response = await api.get(`/api/group/getAllGroupUserId`)
  return response.data
}

export const addMemberToGroup = async () => {
  const response = await api.post(`/api/user/addUserToGroup`)
  return response.data
}

export const updateGroup = async (groupId: string, newGroupName: string) => {
  const response = await api.post(`/api/group/${groupId}`, { group_name: newGroupName })
  return response.data
}

export const getUserInGroup = async (groupId: string) => {
  const response = await api.get(`api/user/getAllUserWithRolesAndPermission`, {
    params: { group_id: groupId }
  })
  return response.data
}

export const addUserToGroup = async (userId: string, groupId: string) => {
  const response = await api.post(`api/user/addUserToGroup`, { user_id: userId, group_id: groupId })
  return response.data
}

export const addUserToGroup = async (userId: string, groupId: string) => {
  const response = await api.post(`api/user/addUserToGroup`, { user_id: userId, group_id: groupId })
  return response.data
}
