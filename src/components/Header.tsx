import React from 'react'
import { ChevronLeft, PersonAdd } from '@material-ui/icons'
import { IconButton, Typography, Grid } from '@material-ui/core'
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
            <ChevronLeft fontSize="inherit" />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={8}>
        <Typography noWrap={true} align="center" variant="h4">
          {headerText}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        {nextPage && (
          <IconButton component={RouterLink} to={nextPage}>
            <PersonAdd htmlColor="black" fontSize="inherit" />
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
}

export default Header
