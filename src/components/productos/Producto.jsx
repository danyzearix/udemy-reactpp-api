import { React, Fragment } from "react"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

function Producto({producto}) {

  const {_id, nombre, precio, imagen } = producto;
//Eliminar producto
  const eliminarProducto = id => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Los productos eliminados no se podrán recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar producto!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Eliminar producto en la API
        clienteAxios.delete(`/productos/${id}`)
          .then(res =>{
            if (res.status === 200) {
              Swal.fire(
                'Eliminado!',
                'El producto a sido eliminado definitivamente.',
                'success'
              )
            }
          })
        
      }
    })
  }
  return (
    <Fragment>
        <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">${precio} </p>
                        {
                          imagen ? (
                          <img src={`http://localhost:5000/${imagen}`} alt="imagen producto"/>
                          ) : null}
                        
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button type="button" 
                                className="btn btn-rojo btn-eliminar"
                                onClick={() => eliminarProducto(_id)}
                                >
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
    </Fragment>
  )
}

export default Producto