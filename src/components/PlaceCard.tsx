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
})

interface PlaceCardProps {
  placeName: string
  isFree: boolean
  visitorsCount: number
  userName?: string
  dateRange?: {
    firstDay: string
    lastDay: string
  }
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  placeName,
  isFree,
  userName,
  dateRange,
  visitorsCount,
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={UserAvatar}></CardMedia>
      <Grid container direction="column" justify="space-between">
        <CardContent>
          <Grid alignItems="center" justify="space-between" container>
            <Typography variant="h5">{placeName}</Typography>
            <Typography color="textSecondary">
              {visitorsCount}&nbsp;
              <PeopleAltIcon style={{ verticalAlign: 'middle' }} />
            </Typography>
          </Grid>
          {isFree ? (
            <Typography color="textSecondary">Free</Typography>
          ) : (
            <>
              <Typography color="textSecondary">
                Reserved till {dateRange?.lastDay}
              </Typography>
              <Typography color="textSecondary">{userName}</Typography>
            </>
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
      </Grid>
    </Card>
  )
}

export default PlaceCard
