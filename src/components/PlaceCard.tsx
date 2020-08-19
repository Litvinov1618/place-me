import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Link,
  Divider,
  Grid,
} from '@material-ui/core'
import { PeopleAlt } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    margin: '0 auto 10px auto',
    height: '141px',
  },
  media: {
    width: '136px',
    height: '188px',
  },
  link: {
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
              <PeopleAlt style={{ verticalAlign: 'middle' }} />
            </Typography>
          </Grid>
          {!isAvailable && (
            <Typography color="textSecondary">{userName}</Typography>
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
              <Link
                color="textSecondary"
                underline="none"
                className={classes.link}
              >
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
