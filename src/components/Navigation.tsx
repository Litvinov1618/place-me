import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Apps, Person } from '@material-ui/icons'
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
  const { root } = useStyles()
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      className={root}
    >
      <BottomNavigationAction
        component={RouterLink}
        to="/places"
        label="Places"
        icon={<Apps />}
      />
      <BottomNavigationAction
        component={RouterLink}
        to="/members"
        label="Members"
        icon={<Person />}
      />
    </BottomNavigation>
  )
}

export default Navigation
