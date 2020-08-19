import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    margin: '0 auto 10px auto',
  },
  media: {
    width: '136px',
    height: '188px',
  },
  link: {
    padding: '6px 8px',
  },
  blackLink: {
    color: 'black',
    padding: '6px 8px',
  },
})

interface PlaceCardProps {
  placeName: string
  isAvailable: boolean
  visitorsCount: number
  userName?: string
  dateRange?: {
    firstDay: string
    lastDay: string
  }
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  placeName,
  isAvailable,
  userName,
  dateRange,
  visitorsCount,
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <Grid container direction="column" justify="space-between">
        <CardContent>
          <Grid alignItems="center" justify="space-between" container>
            <Typography variant="h5">{placeName}</Typography>
            <Typography color="textSecondary">
              {visitorsCount}&nbsp;
              <PeopleAltIcon style={{ verticalAlign: 'middle' }} />
            </Typography>
          </Grid>
          {isAvailable ? (
            <Typography color="textSecondary">Available</Typography>
          ) : (
            <>
              <Typography color="textSecondary">
                Reserved till {dateRange?.lastDay}
              </Typography>
              <Typography color="textSecondary">{userName}</Typography>
            </>
          )}
        </CardContent>
        <div>
          <Divider />
          <CardActions>
            <Link
              underline="none"
              className={classes.link}
              component={RouterLink}
              to="/place-info"
            >
              View
            </Link>
            {isAvailable ? (
              <Link
                underline="none"
                to="/reserve-place"
                component={RouterLink}
                color="primary"
                className={classes.link}
              >
                Reserve
              </Link>
            ) : (
              <Link underline="none" className={classes.blackLink}>
                Reserved till {dateRange?.lastDay}
              </Link>
            )}
          </CardActions>
        </div>
      </Grid>
    </Card>
  )
}

export default PlaceCard
