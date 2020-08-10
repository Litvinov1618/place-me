import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AppsIcon from '@material-ui/icons/Apps'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'

const Navigation: React.FC = () => {
  const [value, setValue] = useState(0)

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
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
      <BottomNavigationAction
        component={RouterLink}
        to="/settings"
        label="Settings"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  )
}

export default Navigation
