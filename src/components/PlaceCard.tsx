import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import UserAvatar from './img/userAvatar.png'

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
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})

interface PlaceCardProps {
  placeName: string
  isFree: boolean
  userEmail?: string
  dateRange?: {
    firstDay: string
    lastDay: string
  }
  visitorsCount?: number
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  placeName,
  isFree,
  userEmail,
  dateRange,
  visitorsCount,
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={UserAvatar}></CardMedia>
      <div className={classes.content}>
        <CardContent>
          <Typography variant="h5">{placeName}</Typography>
          {isFree ? (
            <Typography color="textSecondary">Free</Typography>
          ) : (
            <div>
              <Typography color="textSecondary">{userEmail}</Typography>
              <Typography color="textSecondary">
                {`${dateRange?.firstDay} - ${dateRange?.lastDay}`}
              </Typography>
              <Typography color="textSecondary">
                Visitors: {visitorsCount}
              </Typography>
            </div>
          )}
        </CardContent>
        {isFree && (
          <div>
            <Divider />
            <CardActions>
              <Button to="/reserve-place" component={Link} color="primary">
                Reserve
              </Button>
            </CardActions>
          </div>
        )}
      </div>
    </Card>
  )
}

export default PlaceCard
