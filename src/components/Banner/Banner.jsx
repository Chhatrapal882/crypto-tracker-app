import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import Carousel from './Carousel'

const useStyles = makeStyles({
  banner: {
    backgroundImage: "url(./banner.jpg)",
    backgroundSize: "cover",
    backgroundRepeat:"no-repeat"
  },
  bannerContent : {
    height: "600px",
    paddingTop: 25,
    justifyContent: "space-around",
    display:"flex",
    flexDirection: "column",
  },
  tagline: {
    textAlign:"center"
  }
})

function Banner() {
  const classes = useStyles()
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
              <Typography variant="h2" style={{fontWeight:"bold", marginBottom:"15", fontFamily:"monsterrat"}}>Crypto Hunter</Typography>
              <Typography variant="subtitle1" style={{fontWeight:"bold", marginBottom:"15", color:"darkgray", fontFamily:"monsterrat"}}>Get all the info regarding your favourite crypto currency</Typography>
          </div>
          <Carousel />
      </Container>

    </div>
  )
}

export default Banner