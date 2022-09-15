import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {CryptoState} from '../CryptoContext'
import { Container, createTheme, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import {CoinList} from '../config/api';
import Paper from '@material-ui/core/Paper';

import { ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
  Carousel: {
    height: "50%",
    display: "flex",
    justifyContent: "center",
  },
  caresouselItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    pointer: "cursor",
    textTransform: "uppercase",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type:"dark"
  },
});

function CoinTable() {
  const { currency, symbol } = CryptoState();
  const [loading, setLoading] = useState()
  const [search, setSearch] = useState('')
  const [coins, setcoins] = useState()
  const classes = useStyles();

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  ];

  useEffect(() => {
   const fetchTrendingCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency));
    setcoins(data);
    setLoading(false)

  };
   fetchTrendingCoins();
  }, [currency]);
  return (
    <ThemeProvider theme={theme}>
      <Container style={{textAlign:"center"}}>
        <Typography variant='h4' style={{margin:18, fontFamily:"montserrat"}}>
          Cryptocurrency Prices By Market Cap
        </Typography>
        <TextField
        label ="search for crypto currenct.."
        variant='outlined'
        style={{marginBottom:20, width:"100%"}}
        onChange={(e) => setSearch(e.target.value)}
        />
           <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Container>
    </ThemeProvider>
  )
}

export default CoinTable