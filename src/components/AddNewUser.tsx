import React from 'react'
import Header from './Header'
import { TextField, Grid, Button } from '@material-ui/core'
import { AddAPhoto } from '@material-ui/icons'

const AddNewUser: React.FC = () => {
  return (
    <div>
      <Header headerText="New user" previousPage="/members" />
      <Grid style={{ marginTop: '5px' }} container justify="center" spacing={2}>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" endIcon={<AddAPhoto />}>
            Add user photo
          </Button>
        </Grid>
        <Grid item xs={10}>
          <TextField variant="outlined" label="Email" fullWidth />
        </Grid>
        <Grid item xs={10}>
          <TextField variant="outlined" label="Name" fullWidth />
        </Grid>
        <Grid
          style={{ padding: '8px' }}
          container
          justify="space-around"
          xs={10}
        >
          <Grid item xs={5}>
            <TextField variant="outlined" fullWidth label="Balance" />
          </Grid>
          <Grid item xs={5}>
            <TextField variant="outlined" fullWidth label="Visits count" />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained">Register</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddNewUser
