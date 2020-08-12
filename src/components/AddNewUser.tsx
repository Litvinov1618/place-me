import React from 'react'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Header from './Header'
import Button from '@material-ui/core/Button'
import AddAPhoto from '@material-ui/icons/AddAPhoto'

const AddNewUser: React.FC = () => {
  return (
    <div>
      <Header headerText="New user" previousPage="/members" />
      <List>
        <ListItem>
          <TextField variant="filled" label="Email" autoFocus fullWidth />
        </ListItem>
        <ListItem>
          <Button variant="outlined" endIcon={<AddAPhoto />}>
            Add user photo
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained">Register</Button>
        </ListItem>
      </List>
    </div>
  )
}

export default AddNewUser
