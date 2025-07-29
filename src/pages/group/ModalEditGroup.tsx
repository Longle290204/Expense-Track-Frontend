import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField } from '@mui/material'
// import { ModalEditGroupProps } from './types'

interface ModalEditGroupProps {
  open: boolean
  onClose: () => void
  onOpen: () => void
  groupId: string
  currentGroupName: string
  onEditGroup: (groupId: string, newName: string) => void
}

export default function ModalEditGroup({
  open,
  onClose,
  onOpen,
  groupId,
  currentGroupName,
  onEditGroup
}: ModalEditGroupProps) {
  const [newGroupName, setNewGroupName] = React.useState('')

  React.useEffect(() => {
    if (open && currentGroupName) {
      setNewGroupName(currentGroupName)
    }
  }, [open, currentGroupName])

  const handleSave = () => {
    if (newGroupName.trim()) {
      onEditGroup(groupId, newGroupName.trim())
      onClose()
    }
  }

  return (
    <React.Fragment>
      <button
        className='text-gray-400 hover:text-gray-500 transition-colors'
        onClick={(e) => {
          e.stopPropagation()
          onOpen()
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7 cursor-pointer'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
        </svg>
      </button>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' sx={{ fontSize: 20 }}>
          Sửa nhóm
        </DialogTitle>
        <DialogContent>
          <TextField
            id='standard-basic'
            variant='standard'
            autoFocus
            margin='dense'
            label='Sửa tên'
            fullWidth
            slotProps={{
              inputLabel: { sx: { fontSize: '16px' } },
              input: { sx: { height: '30px', fontSize: '16px' } }
            }}
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ fontSize: '13px' }}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={!newGroupName.trim()} sx={{ fontSize: '13px' }}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
