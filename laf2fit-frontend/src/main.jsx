import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import theme from "./theme";
import { store } from "./store/index.js";
import { ToastContainer } from "./components";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <CSSReset />
        <App />
        <ToastContainer />
      </Router>
    </Provider>
  </ChakraProvider>
);
