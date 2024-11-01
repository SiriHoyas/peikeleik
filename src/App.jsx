import "./App.css";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "./redux/store/store";
import Router from "./router/router";
import { theme } from "./theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <Router />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
