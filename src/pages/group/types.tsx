export interface GroupTypes {
  group_id: string
  group_name: string
  group_member: number
  createdAt: Date
}

export interface Member {
  id: string
  name: string
  email: string
  role: string
  joinedAt: string
  totalExpense: number
  avatar?: string
}

export interface GroupDetailProps {
  open: boolean
  onClose: () => void
  groupName?: string
  groupId?: string
}

export interface Permission {
  permission_id: string
  permission_name: string
  description: string
}

export interface Role {
  role_id: string
  role_name: string
  description: string
  permissions: string[] // permission IDs
}

export interface MemberTabProps {
  members: Member[]
  setMembers: (members: Member[]) => void
  availableRoles: any[]
  showAddMember: boolean
  setShowAddMember: (show: boolean) => void
  newMemberEmail: string
  setNewMemberEmail: (email: string) => void
  newMemberRole: string
  setNewMemberRole: (role: string) => void
  handleAddMember: () => void
  handleRoleChange: (id: string, role: string) => void
  removeMember: (id: string) => void
  getRoleColor: (role: string) => string
  getRoleText: (role: string) => string
}

export interface ModalCreateGroupProps {
  open: boolean
  onClose: () => void
  groupName: string
  setGroupName: (name: string) => void
  onCreateGroup: () => void
  onOpen: () => void
}

export interface ModalEditGroupProps {
  open: boolean
  onClose: () => void
  onOpen: () => void
  onEditGroup: (groupId: string, newName: string) => void
  groupId: string
}
