import React from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink } from 'react-router-dom'

interface HeaderProps {
  headerText: string
  previousPage?: string
  nextPage?: string
}

const Header: React.FC<HeaderProps> = ({
  headerText,
  previousPage,
  nextPage,
}) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        {previousPage && (
          <IconButton component={RouterLink} to={previousPage}>
            <ChevronLeftIcon fontSize="inherit" />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={8}>
        <Typography align="center" variant="h4">
          {headerText}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        {nextPage && (
          <IconButton component={RouterLink} to={nextPage}>
            <PersonAddIcon htmlColor="black" fontSize="inherit" />
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
}

export default Header
