import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import userAvatar from './img/userAvatar.png'
import Header from './Header'
import { Link } from 'react-router-dom'

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
      <Header headerText="Members" nextPage="/new-user" />
      <List>
        {testMembers.map(({ userEmail, balance }) => (
          <ListItem
            button
            component={Link}
            to="/user-page"
            divider
            alignItems="center"
            key={userEmail}
          >
            <Grid item xs={2}>
              <Avatar src={userAvatar} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1">{userEmail}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">{`$ ${balance}`}</Typography>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Members
