import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Navbar from "./components/Navbar.js";
import CardList from "./components/CardList";
import Tables from "./components/Tables";
import Saved from "./components/Saved";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const theme = createMuiTheme({
  typography: {
    fontFamily: "Raleway, Arial",
  },
});
function App() {
  let [stocks, setStocks] = useState([]);
  let fetchStocks = async () => {
    let res = await axios({
      method: "GET",
      url: "https://sandbox.tradier.com/v1/markets/quotes",
      params: {
        symbols:
          "AAPL,MSFT,AMZN,GOOG,GOOGL,FB,TSLA,TSM,JPM,V,JNJ,WMT,BABA,MA,NVDA",
        greeks: "false",
      },
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    });
    setStocks(res.data.quotes.quote);
  };
  let cardData = stocks.filter(
    (stock) =>
      stock.symbol === "AMZN" ||
      stock.symbol === "FB" ||
      stock.symbol === "GOOGL"
  );
  useEffect(() => {
    fetchStocks();
  }, [stocks]);
  return (
    <div className="App">
      <Router>
        {" "}
        <ThemeProvider theme={theme}>
          {" "}
          <CssBaseline />
          <Navbar />
          <CardList cardData={cardData} />
          <Switch>
            <Route path="/" exact render={() => <Tables stocks={stocks} />} />
            <Route
              path="/saved"
              exact
              render={() => <Saved stocks={stocks} />}
            />
          </Switch>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
