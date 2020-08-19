import React from 'react'
import {
  List,
  ListItem,
  Avatar,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import userAvatar from './img/userAvatar.png'
import Header from './Header'
import { Link } from 'react-router-dom'

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
    <>
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
    </>
  )
}

export default Members
