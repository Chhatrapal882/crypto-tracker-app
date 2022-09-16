import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";

import Pagination from '@material-ui/lab/Pagination';
import { CoinList } from "../config/api";
import Paper from "@material-ui/core/Paper";
import If from "if-else-react";
import Else from 'if-else-react'

import { ThemeProvider } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  row : {
    backgroundColor:"#16171a",
    "&:hover" : {
      backgroundColor:"#95868673"
    },
    fontFamily:"Montserrat"
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold"
    }
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function CoinTable() {
  const navigate = useNavigate();

  const { currency } = CryptoState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(" ");
  const [coins, setcoins] = useState();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setcoins(data);
      setLoading(false);
    };
    fetchTrendingCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins && coins?.filter(
      (coin) =>
        coin?.name.toLowerCase().includes(search) ||
        coin?.symbol.toLowerCase().includes(search) ||
        coin
    );
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "montserrat" }}
        >
          Cryptocurrency Prices By Market Cap
        </Typography>
        <TextField
          label="search for crypto currenct.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          <If condition={loading}>
            <LinearProgress style={{ background: "gold" }} />
          </If>
            <Else condition={!loading}>
              <Table
                className={classes.table}
                aria-label="simple table"
                style={{ backgroundColor: "black" }}
              >
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24 Change", "Market Cap"].map((head) => {
                      return (
                        <TableCell
                          align={`Coin` ? "left" : "right"}
                          style={{ color: "black" }}
                          key={head}
                        >
                          {head}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()?.slice((page-1)*10, (page-1) * 10+ 10).map((row, index) => {
                    const price = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow key={index} className={classes?.row} onClick={() => navigate(`/coins/${row?.id}`)} key={row?.id}>
                        <TableCell align="left" component="th" scope="row" style={{display:"", gap:15}}>
                          <img src={row.image} alt="" height="50" style={{marginBottom: 10}} />
                          <div style={{display:"flex", flexDirection:"row"}}>
                            <span>
                            {row?.symbol}  &nbsp;
                              <span style={{color:"darkgray"}}>{row?.name}</span>
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{row.price_change_percentage_24h}d</TableCell>
                        <TableCell style={{color:price ? "white" :"red"}}>{row?.price_change_24h.toFixed(2)}</TableCell>
                        <TableCell>{row?.market_cap}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Pagination
              style={{
                width:"100%",
                padding:20,
                display:"flex",
                justifyContent:"center"
              }}
              classes={{ul: classes.pagination}}
              count = {(handleSearch()?.length/10).toFixed(0)}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0,450)
              }}
             />
            </Else>
        </TableContainer>
     
      </Container>
    </ThemeProvider>
  );
}

export default CoinTable;
