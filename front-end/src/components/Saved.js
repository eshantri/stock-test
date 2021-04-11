import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function Tables() {
  let [page, setPage] = useState(1);
  let [stocks, setPageStocks] = useState([]);
  const req = async () => {
    const res = await axios({
      method: "get",
      url: "http://127.0.0.1:5000/",
    });
    setPageStocks(res.data["quotes"]);
  };
  useEffect(() => {
    // getCompanies();
    req();
  }, [page]);
  const handleDelete = async (id) => {
    const res = await axios(`http://127.0.0.1:5000/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
    req();
    console.log(res);
  };
  if (stocks.length < 1) {
    return (
      <Typography gutterBottom variant="h5" component="h5">
        There is no data saved
      </Typography>
    );
  }
  return (
    <div className="table-container">
      <div className="row form">
        <Typography gutterBottom variant="h5" component="h5">
          Saved Data
        </Typography>
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

      {stocks.map((stock) => (
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
          <Button
            onClick={() => handleDelete(stock._id)}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
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
