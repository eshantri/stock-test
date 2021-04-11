import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import axios from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from "react-router-dom";
export default function Tables(props) {
  let [page, setPage] = useState(1);
  let [stocks, setPageStocks] = useState([]);
  let [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  let [suggestions, setSuggestions] = useState([]);
  const handleSearch = (val) => {
    setSearch(val);
  };

  const req = async (stock) => {
    const ac = new AbortController();
    console.log(stock);
    const reqB = {
      symbol: stock.symbol,
      description: stock.description,
      volume: stock.volume,
      close: stock.close,
      marketCap: parseInt((stock.volume * stock.close) / 10000000),
    };
    await fetch(
      "http://127.0.0.1:5000/",
      {
        method: "post",
        body: JSON.stringify(reqB),
        headers: { "Content-Type": "application/json" },
      },
      { signal: ac.signal }
    ).catch((e) => console.log(e));
    return ac.abort();
  };

  const getCompanies = () => {
    if (search === "")
      setPageStocks(props.stocks.slice((page - 1) * 5, page * 5));
    else {
      const suggestions = stocks.filter((stock) => {
        return stock.description.toLowerCase().includes(search.toLowerCase());
      });
      setSuggestions(suggestions);
    }
  };
  const renderButton = (stock) => {
    const status =
      saved.filter((save) => save.symbol === stock.symbol).length > 0
        ? "saved"
        : "unsaved";
    if (status === "saved") {
      return (
        <Typography
          variant="h5"
          style={{ backgroundColor: "blue" }}
          component="h5"
        >
          <Link to="/saved">View</Link>
        </Typography>
      );
    } else {
      return (
        <Button variant="contained" onClick={() => req(stock)} color="primary">
          Save
        </Button>
      );
    }
  };

  useEffect(() => {
    // getCompanies()

    const getStocks = async () => {
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:5000/",
      });
      setSaved(res.data["quotes"]);
    };
    getStocks();
    setPageStocks(props.stocks.slice((page - 1) * 5, page * 5));
  }, [page, props.stocks]);
  return (
    <div className="table-container">
      <div className="row form">
        <Typography gutterBottom variant="h5" component="h5">
          Stock details Table
        </Typography>
        <TextField
          id="outlined-basic"
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
            getCompanies();
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>
      <div className="row header">
        <Typography gutterBottom variant="h5" component="h5">
          Company Name
        </Typography>
        <Typography gutterBottom variant="h5" component="h5">
          Symbol
        </Typography>
        <Typography gutterBottom variant="h5" component="h5">
          Market Cap
        </Typography>
        <Typography gutterBottom variant="h5" component="h5"></Typography>
        <Typography gutterBottom variant="h5" component="h5">
          Current Price
        </Typography>
      </div>
      {search
        ? suggestions.map((stock) => (
            <div className="row">
              <Typography gutterBottom variant="p" component="p">
                {stock.description}
              </Typography>
              <Typography gutterBottom variant="p" component="p">
                {stock.symbol}
              </Typography>
              <Typography gutterBottom variant="p" component="p">
                {parseInt((stock.volume * stock.close) / 10000000)} Billion USD
              </Typography>
              {renderButton(stock)}
              <Typography gutterBottom variant="p" component="p">
                {stock.close}
              </Typography>
            </div>
          ))
        : stocks.map((stock) => (
            <div className="row">
              <Typography gutterBottom variant="p" component="p">
                {stock.description}
              </Typography>
              <Typography gutterBottom variant="p" component="p">
                {stock.symbol}
              </Typography>
              <Typography gutterBottom variant="p" component="p">
                {parseInt((stock.volume * stock.close) / 10000000)} Billion USD
              </Typography>
              {renderButton(stock)}
              <Typography gutterBottom variant="p" component="p">
                {stock.close}
              </Typography>
            </div>
          ))}

      <div className="row actions">
        {" "}
        <Typography gutterBottom variant="p" component="p">
          {(page - 1) * 5 + 1}-{page * 5}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setPage(page - 1)}
          color="default"
        >
          {"<"}
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          variant="contained"
          color="default"
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}
