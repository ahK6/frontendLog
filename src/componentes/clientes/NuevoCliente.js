import React, { Fragment, useState, useContext } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import clienteAxios from "../../config/axios";

// import el Context
import { CRMContext } from "../../context/CRMContext";

function NuevoCliente({ history }) {
  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  // cliente = state, guardarcliente = funcion para guardar el state
  const [cliente, guardarCliente] = useState({
    names: "",
    email: "",
    password: "",
  });

  // leer los datos del formulario
  const actualizarState = (e) => {
    // Almacenar lo que el usuario escribe en el state
    guardarCliente({
      // obtener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // Añade en la REST API un cliente nuevo
  const agregarCliente = (e) => {
    e.preventDefault();

    // enviar petición
    clienteAxios
      .post("/newuser", cliente)
      .then((res) => {
        console.log(res.data.code);
        // validar si hay errores de mongo

        Swal.fire("Se agregó el Cliente", res.data.mensaje, "success");

        // Redireccionar
        history.push("/");
      })
      .catch((error) => {
        if (error.response.status == 409) {
          Swal.fire({
            type: "error",
            title: "Hubo un error",
            text: "Ese cliente ya esta registrado",
          });
        } else {
          Swal.fire({
            type: "error",
            title: "Hubo un error inesperado",
            text: "Por favor vuelve intentarlo",
          });
        }
      });
  };

  // Validar el formulario
  const validarCliente = () => {
    // Destructuring
    const { names, email, password } = cliente;

    // revisar que las propiedades del state tengan contenido
    let valido = !names.length || !email.length || !password.length;

    // return true o false
    return valido;
  };

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>

      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="names"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}

// HOC, es una función que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);
