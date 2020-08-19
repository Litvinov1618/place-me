import React, { useState } from 'react'
import SimpleDialog from './SimpleDialog'
import Header from './Header'
import {
  Select,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Container,
  Button,
  Snackbar,
  IconButton,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
  },
})

const ReservePlace: React.FC = () => {
  const [email, setEmail] = useState('')
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEmail(event.target.value as string)
  }
  const classes = useStyles()

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }
  // \Snackbar

  // Dialog:
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
    setOpenSnackbar(true)
  }
  // \Dialog

  return (
    <div>
      <Header headerText="Reserve Place" previousPage="/places" />
      <Container>
        <FormControl fullWidth margin="dense">
          <InputLabel id="select-user">Select User</InputLabel>
          <Select value={email} onChange={handleChange} labelId="select-user">
            <MenuItem value="randy@email.com">randy@email.com</MenuItem>
            <MenuItem value="john@email.com">john@email.com</MenuItem>
            <MenuItem
              className={classes.root}
              button
              component={Link}
              to="/new-user"
            >
              Add new user
            </MenuItem>
          </Select>
        </FormControl>
        <Grid style={{ marginTop: '10px' }} container justify="center">
          <Button variant="outlined" onClick={handleClickOpen}>
            Reserve
          </Button>
        </Grid>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={selectedValue}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
              >
                <Close fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Container>
    </div>
  )
}

export default ReservePlace
