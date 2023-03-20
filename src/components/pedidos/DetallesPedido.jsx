import React from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function DetallesPedido({pedido}) {

    //Extraer los valores
    const { _id } = pedido;

    const eliminarPedido = id =>{

        Swal.fire({
            title: 'Estas seguro?',
            text: "Un registro eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar definitivamente!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //Llamar axios
                clienteAxios.delete(`/pedidos/${id}`)
                .then(res =>{
                    Swal.fire(
                        'Eliminado',
                        'El registro fue eliminado',
                        'success'
                      );
                   });
              
            }
          });
        };

    const {cliente} = pedido;
  return (
    <li className="pedido">
                    <div className="info-pedido">
                        <p className="id">ID: 0192019201291201</p>
                        <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>
    
                        <div className="articulos-pedido">
                            <p className="productos">Artículos Pedido: </p>
                            <ul>
                                
                                {pedido.pedido.map(articulos => (
                                <li key={pedido.id + articulos.producto._id}>
                                <p>Nombre: {articulos.producto.nombre}</p>
                                <p>Precio: {articulos.producto.precio}</p>
                                <p>Cantidad: {articulos.cantidad}</p>
                                </li>
                                
        ))}  
                                
                            </ul>
                        </div>
                        <p className="total">Total: ${pedido.total} </p>
                    </div>
                    <div className="acciones">

                        <button type="button" className="btn btn-rojo btn-eliminar"
                                onClick={() => eliminarPedido(_id)}>
                            <i className="fas fa-times"></i>
                            Eliminar Pedido
                        </button>
                    </div>
                </li>
  )
}

export default DetallesPedido