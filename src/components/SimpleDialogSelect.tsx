import React from 'react'
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({
  onClose,
  selectedValue,
  open,
}) => {
  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          How do you prefer to pay?
        </DialogTitle>
        <List>
          <ListItem button onClick={() => handleListItemClick('Balance')}>
            <ListItemText primary="Balance" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick('Visits')}>
            <ListItemText primary="Visits" />
          </ListItem>
        </List>
      </Dialog>
    </>
  )
}

export default SimpleDialog
