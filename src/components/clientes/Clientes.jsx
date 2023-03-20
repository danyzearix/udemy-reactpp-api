import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import clienteAxios from "../../config/axios";
import Cliente from './Cliente';
import { Link } from 'react-router-dom';


const Clientes = () => {
  //Usar el state
  const [clientes, guardasClientes] = useState([]);
  //Consultar API
  const consultarAPI = async () => {
  const clientesConsulta = await clienteAxios.get("/clientes");
    
    //Poner resultado en el state
    guardasClientes(clientesConsulta.data);
    //console.log(clientesConsulta);
  }

  //Use Effect para montar componente
  useEffect(()=>{
    consultarAPI();
  },[clientes] )

  if (!clientes.length) return <Spinner/>
  
  return (
    <Fragment>
      <h2>Clientes</h2>
        <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                  Nuevo Cliente
        </Link>
      <ul className='listado-clientes'> 
      {clientes.map(cliente =>(<Cliente
      key={cliente._id}
      cliente={cliente}/>))}
      </ul>
    </Fragment>
    
  )
}

export default Clientes