import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

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
