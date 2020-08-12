import React, { useState } from 'react'
import Header from './Header'
import Avatar from '@material-ui/core/Avatar'
import UserAvatar from './img/userAvatar.png'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles({
  avatarSize: {
    height: '120px',
    width: '120px',
    margin: '0 auto',
  },
})

const testUserData = {
  userEmail: 'randy@email.com',
  balance: 135,
  visitsLeft: 4,
  dateRange: {
    firstDay: '1 Sep',
    lastDay: '5 Sep',
  },
}

const UserPage: React.FC = () => {
  const { userEmail, balance, visitsLeft, dateRange } = testUserData
  const { avatarSize } = useStyles()
  const [showDateRange, setShowDateRange] = useState(false)
  const switchDateRangemenu = () => {
    if (showDateRange) setShowDateRange(false)
    else setShowDateRange(true)
  }
  return (
    <div>
      <Header headerText={userEmail} previousPage="/members" />
      <List>
        <ListItem>
          <Avatar className={avatarSize} src={UserAvatar} />
        </ListItem>
        <ListItem divider>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="subtitle1">Balance:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{`$ ${balance}`}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="subtitle1">Visits Left:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{visitsLeft}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem divider>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="subtitle1">Show reserved seats:</Typography>
            </Grid>
            <Grid item>
              <Switch
                onChange={switchDateRangemenu}
                color="primary"
                edge="end"
              />
            </Grid>
          </Grid>
        </ListItem>
        {showDateRange && (
          <ListItem>
            <Typography variant="subtitle1">{`${dateRange?.firstDay} - ${dateRange?.lastDay}`}</Typography>
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default UserPage
