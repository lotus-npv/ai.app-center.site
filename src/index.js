import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"
import DataProvider from "./data/DataProvider"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import GlobalStyles from "assets/global-style"
// import 'primereact/resources/primereact.css';
// import "primereact/resources/primereact.min.css";
// import 'primereact/resources/themes/tailwind-light/theme.css';
// import 'primereact/resources/themes/saga-blue/theme.css'

import store from "./store"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <GlobalStyles>
    <Provider store={store}>
      <DataProvider>
        <React.Fragment>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.Fragment>
      </DataProvider>
    </Provider>
  // </GlobalStyles>
)

serviceWorker.unregister()
