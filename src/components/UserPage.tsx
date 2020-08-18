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
import Container from '@material-ui/core/Container'
import SimpleDialog2 from './SimpleDialog2'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
  avatarSize: {
    height: '120px',
    width: '120px',
    margin: '0 auto',
  },
})

const testUserData = {
  userName: 'Randy',
  balance: 135,
  visitsLeft: 4,
  dateRange: {
    firstDay: '1 Sep',
    lastDay: '5 Sep',
  },
}

const UserPage: React.FC = () => {
  const { userName, balance, visitsLeft, dateRange } = testUserData
  const { avatarSize } = useStyles()
  const [showDateRange, setShowDateRange] = useState(false)
  const switchDateRangemenu = () => {
    if (showDateRange) setShowDateRange(false)
    else setShowDateRange(true)
  }

  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  return (
    <div>
      <Header headerText={userName} previousPage="/members" />
      <Container>
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
                <Typography variant="subtitle1">
                  {`$ ${balance}`}
                  <IconButton
                    style={{ padding: '0 0 0 5px' }}
                    onClick={handleClick}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Typography>
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
                <Typography variant="subtitle1">
                  Show reserved seats:
                </Typography>
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
        <SimpleDialog2
          open={open}
          onClose={handleClose}
          dialogTitle="Balance"
        />
      </Container>
    </div>
  )
}

export default UserPage
