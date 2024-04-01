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
import store from "./store"
// import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
// import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'
// import 'primereact/resources/themes/md-light-indigo/theme.css'
// import 'primereact/resources/themes/md-light-deeppurple/theme.css'
// import 'primereact/resources/themes/mdc-light-indigo/theme.css'
// import 'primereact/resources/themes/mdc-light-deeppurple/theme.css'
// import 'primereact/resources/themes/tailwind-light/theme.css'
// import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
// import 'primereact/resources/themes/lara-light-purple/theme.css'
// import 'primereact/resources/themes/soho-light/theme.css'
// import 'primereact/resources/themes/viva-light/theme.css'
// import 'primereact/resources/themes/mira/theme.css'
// import 'primereact/resources/themes/nano/theme.css'
// import 'primereact/resources/themes/saga-blue/theme.css'
// import "primereact/resources/themes/saga-green/theme.css"
// import 'primereact/resources/themes/saga-orange/theme.css'
// import 'primereact/resources/themes/saga-purple/theme.css'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Provider store={store}>
      <DataProvider>
        <React.Fragment>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.Fragment>
      </DataProvider>
    </Provider>
)

serviceWorker.unregister()
