import React, { useEffect, useState, useContext, Fragment } from "react";

// importar cliente axios
import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";
import { Link, withRouter } from "react-router-dom";

// import el Context
import { CRMContext } from "../../context/CRMContext";

function Clientes(props) {
  // Trabajar con el state
  // clientes = state,  guardarClientes = funcion para guardar el state
  const [clientes, guardarClientes] = useState([]);

  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  // use effect es similar a componentdidmount y willmount
  useEffect(() => {
    if (auth.token !== "") {
      // Query a la API
      const consultarAPI = async () => {
        try {
          const clientesConsulta = await clienteAxios.get(
            "/ver-usuarios",

            {
              headers: {
                Authorization: `Bearer ${auth.token}`,

                withCredentials: true,
              },
            },
            {}
          );

          // colocar el resultado en el state
          guardarClientes(clientesConsulta.data);
        } catch (error) {
          // Error con authorizacion
          if ((error.response.status = 500)) {
            //props.history.push("/iniciar-sesion");
            console.log(error.response);
          }
        }
      };
      consultarAPI();
    } else {
      props.history.push("/");
    }
  }, [clientes]);

  // Si el state esta como false
  if (!auth.auth) {
    props.history.push("/");
  }

  return (
    <Fragment>
      <h2>Clientes</h2>

      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </Fragment>
  );
}
export default withRouter(Clientes);
