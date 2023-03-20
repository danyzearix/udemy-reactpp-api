import React, {useEffect, useState, Fragment} from 'react'
import clienteAxios from "../../config/axios";
import DetallesPedido from './DetallesPedido';

const Pedidos = () => {

  const [pedidos, guardarPedidos] = useState([])

  useEffect(() =>{

    const consultarApi = async () => {
      const resultado = await clienteAxios.get("/pedidos");
      guardarPedidos(resultado.data);
    }

    consultarApi();
  },[pedidos]);

  return (
    <Fragment>
      <ul className="listado-pedidos">
        {pedidos.map(pedido => (
          <DetallesPedido
          key={pedido.id}
          pedido={pedido}/>
        ))}          
      </ul>
                            
    </Fragment>
  )
}

export default Pedidos