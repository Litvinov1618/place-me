import React from 'react'
import { Dialog, DialogTitle, TextField, Button } from '@material-ui/core'

interface SimpleDialogProps {
  open: boolean
  onClose: (value: string) => void
  dialogTitle: string
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({
  onClose,
  open,
  dialogTitle,
}) => {
  const handleClose = () => {
    onClose('')
  }

  const handleListItemClick = () => {
    onClose('')
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
        <TextField variant="outlined" />
        <Button onClick={handleListItemClick}>Change balance</Button>
      </Dialog>
    </>
  )
}

export default SimpleDialog
