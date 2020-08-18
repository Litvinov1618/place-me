import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import userAvatar from './img/userAvatar.png'
import Header from './Header'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'

const testMembers = [
  {
    userName: 'Randy',
    balance: 49,
  },
  {
    userName: 'John',
    balance: 135,
  },
]

const Members: React.FC = () => {
  return (
    <div>
      <Header headerText="Members" nextPage="/new-user" />
      <Container>
        <List>
          {testMembers.map(({ userName, balance }) => (
            <ListItem
              button
              component={Link}
              to="/user-page"
              divider
              alignItems="center"
              key={userName}
            >
              <Grid item xs={2}>
                <Avatar src={userAvatar} />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1">{userName}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  align="right"
                  variant="subtitle1"
                >{`$ ${balance}`}</Typography>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  )
}

export default Members
