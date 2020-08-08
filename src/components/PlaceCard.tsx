import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

interface PlaceCardProps {
  placeName: string
  isFree: boolean
  userEmail?: string
  dateRange?: string
  visitorsCount?: number
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  placeName,
  isFree,
  userEmail,
  dateRange,
  visitorsCount,
}) => {
  return (
    <Card>
      <CardContent>Content</CardContent>
      {isFree && <CardActions>Card Actions</CardActions>}
    </Card>
  )
}

export default PlaceCard
