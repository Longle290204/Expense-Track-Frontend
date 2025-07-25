import axios from 'axios'

const API_URL = 'http://localhost:8080/ExpenseTrackApp/api/group'

const accessToken = localStorage.getItem('accessToken')

export const createGroup = async (groupName: String) => {
  const response = await axios.post(
    `${API_URL}/create`,
    {
      group_name: groupName
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return response.data
}

export const getGroupsUser = async () => {
  const response = await axios.get(`${API_URL}/getAllGroupUserId`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }) // ví dụ dùng GET để lấy toàn bộ
  return response.data
}
