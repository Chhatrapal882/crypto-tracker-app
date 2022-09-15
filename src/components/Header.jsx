import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { CryptoState } from '../CryptoContext'


const useStyles = makeStyles({
  Title : {
      flex:1,
      color:"gold",
      fontFamily:"Montserrat",
      fontWeight:"bold",
      cursor: "pointer"
  }
})

const darkTheme = createTheme({
  palette : {
    primary : {
      main: "#fff"
    },
    type: "dark"
  }
})

function Header() {
  const {currency, setCurrency} = CryptoState()
  const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography className={classes.Title}>Crypto Hunter</Typography>
          <Select variant='outlined' color='secondary' value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <MenuItem value={"USD"} >USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
   </ThemeProvider>
  )
}

export default Header