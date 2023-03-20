import React from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

const Cliente = ({cliente}) => {


    //Extraer los valores
    const { _id, nombre, apellido, empresa, email, telefono} = cliente;

    //Función para eliminar cliente
     const eliminarCliente = id =>{

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
                clienteAxios.delete(`/clientes/${id}`)
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
        
  return (
    <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{nombre} {apellido}</p>
                        <p className="empresa">{empresa}</p>
                        <p>{email}</p>
                        <p>{telefono}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>

                        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                            <i className="fas fa-plus"></i>
                            Nuevo pedido
                        </Link>

                        <button 
                        type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => eliminarCliente(_id)}
                        >
                            
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
  )
}

export default Cliente