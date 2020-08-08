import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplate: '100%/1fr 5fr 1fr',
    alignItems: 'center',
  },
})

interface HeaderProps {
  headerText: string
}

const Header: React.FC<HeaderProps> = ({ headerText }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <IconButton>
        <ChevronLeftIcon fontSize="inherit" />
      </IconButton>
      <Typography align="center" variant="h4">
        {headerText}
      </Typography>
    </div>
  )
}

export default Header
