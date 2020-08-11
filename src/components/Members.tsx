import React from 'react'
import GridList from '@material-ui/core/GridList'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import userAvatar from './img/userAvatar.png'
import Header from './Header'

const testMembers = [
  {
    userEmail: 'randy@gmail.com',
    balance: 49,
  },
  {
    userEmail: 'john@gmail.com',
    balance: 135,
  },
]

const Members: React.FC = () => {
  return (
    <div>
      <Header headerText="Members" />
      <GridList spacing={0} cellHeight={56} cols={1}>
        {testMembers.map(({ userEmail, balance }) => (
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <Avatar src={userAvatar} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1">{userEmail}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">{`$ ${balance}`}</Typography>
            </Grid>
          </Grid>
        ))}
      </GridList>
    </div>
  )
}

export default Members
