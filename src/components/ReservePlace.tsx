import React from 'react'
import Header from './Header'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

const ReservePlace: React.FC = () => {
  return (
    <div>
      <Header headerText="Reserve Place" previousPage="/places" />
      <Container>
        <FormControl fullWidth margin="dense">
          <InputLabel id="select-user">Select User</InputLabel>
          <Select labelId="select-user">
            <MenuItem>randy@gmail.com</MenuItem>
            <MenuItem>john@gmail.com</MenuItem>
          </Select>
        </FormControl>
        <Grid container justify="space-between">
          <Grid item xs={5}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="select-user">Select User</InputLabel>
              <Select labelId="select-user">
                <MenuItem>randy@gmail.com</MenuItem>
                <MenuItem>john@gmail.com</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="select-user">Select User</InputLabel>
              <Select labelId="select-user">
                <MenuItem>randy@gmail.com</MenuItem>
                <MenuItem>john@gmail.com</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: '10px' }} container justify="center">
          <Button variant="outlined">Reserve</Button>
        </Grid>
      </Container>
    </div>
  )
}

export default ReservePlace
