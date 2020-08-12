import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AppsIcon from '@material-ui/icons/Apps'
import PersonIcon from '@material-ui/icons/Person'
// import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    width: '100%',
    maxWidth: '444px',
  },
})

const Navigation: React.FC = () => {
  const [value, setValue] = useState(null)
  const classes = useStyles()
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      className={classes.root}
    >
      <BottomNavigationAction
        component={RouterLink}
        to="/places"
        label="Places"
        icon={<AppsIcon />}
      />
      <BottomNavigationAction
        component={RouterLink}
        to="/members"
        label="Members"
        icon={<PersonIcon />}
      />
      {/* <BottomNavigationAction
        component={RouterLink}
        to="/settings"
        label="Settings"
        icon={<SettingsIcon />}
      /> */}
    </BottomNavigation>
  )
}

export default Navigation
