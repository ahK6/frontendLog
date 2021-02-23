import React, { Fragment, useContext } from "react";

// Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*** Layout */
import Header from "./componentes/layout/Cabecera";
/** Componentes */
import Clientes from "./componentes/clientes/Clientes";
import NuevoCliente from "./componentes/clientes/NuevoCliente";

import Login from "./componentes/auth/Login";

import { CRMContext, CRMProvider } from "./context/CRMContext";
import Cabecera from "./componentes/layout/Cabecera";

function App() {
  // utilizar context en el componente
  const [auth, guardarAuth] = useContext(CRMContext);

  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
          <Cabecera />
          <div className="grid contenedor contenido-principal">
            <main className="caja-contenido col-9">
              <Switch>
                <Route exact path="/clientes" component={Clientes} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />

                <Route exact path="/" component={Login} />
              </Switch>
            </main>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;
