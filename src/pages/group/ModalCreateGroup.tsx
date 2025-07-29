import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { ModalCreateGroupProps } from './types'

export default function ModalCreateGroup({
  open,
  onClose,
  groupName,
  setGroupName,
  onCreateGroup,
  onOpen
}: ModalCreateGroupProps) {
  return (
    <div>
      <Button variant='contained' className='flex items-center' onClick={onOpen}>
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
        onClose={onClose}
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
          <Button onClick={onClose} sx={{ fontSize: '13px' }}>
            Hủy
          </Button>
          <Button onClick={onCreateGroup} disabled={!groupName.trim()} sx={{ fontSize: '13px' }}>
            Tạo nhóm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
