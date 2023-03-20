import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import clienteAxios from "../../config/axios";
import Producto from "./Producto"
import { Link } from 'react-router-dom';

const Productos = () => {
  //Usar useState 
  const [productos, guardarProductos] = useState([]);

  
   //Use Effect para montar componente
   useEffect(() => {
    const consultarApi = async () => {
        const productosConsulta = await clienteAxios.get("/productos");
        guardarProductos(productosConsulta.data);
    };

    setTimeout(() => {
        consultarApi();
    }, 1000);

}, [productos]);


  if (!productos.length) return <Spinner/>

  return (
    <Fragment>
        <h2>Productos</h2>
        <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
              {productos.map(producto => (
                <Producto 
                  key={producto._id}
                  producto={producto}/>
              ))}
            </ul>
    </Fragment>
  )
}

export default Productos