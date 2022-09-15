import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

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

const responsive = {
  0: {
    items: 2,
  },
  512: {
    items: 4,
  },
};

function Carousel() {
  const { currency, symbol } = CryptoState();
  const classes = useStyles();
  const [trending, setTrending] = useState();
  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    };
    fetchTrendingCoins();
  }, [currency]);

  const numberswithCommas = (price) => {
    return price.toString().replace("/\B(?=(\d{3})+(?!\d))/g", ",");
  };

  const items =
    trending &&
    trending.map((coin) => {
      const price = coin.price_change_percentage_24h >= 0;
      return (
        <Link className={classes.caresouselItem} to={`coind/${coin?.id}`}>
          <img
            src={coin?.image}
            alt={coin?.name}
            style={{ marginBottom: 10, height: "80px" }}
          />
          <span style={{ fontSize: "22px", fontWeight: "500" }}>
            {coin?.symbol} &nbsp;
            <span style={{color:"red", fontSize:"18px"}}>
              {price && "+"}
              {coin?.price_change_percentage_24h}
            </span>
          </span>
          <span>
            <span>{symbol}</span>
            {numberswithCommas(coin?.current_price.toFixed())}
          </span>
        </Link>
      );
    });

  return (
    <div className={classes.Carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        disableAutoPlayControls
        autoPlayInterval={1000}
        animationDuration={1500}
        autoPlay
        responsive={responsive}
        disableDotsControls
        items={items}
        disableButtonsControls
      />
    </div>
  );
}

export default Carousel;
