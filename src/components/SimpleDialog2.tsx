import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
