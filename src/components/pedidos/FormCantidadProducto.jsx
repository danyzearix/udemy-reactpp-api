import React from 'react'

function FormCantidadProducto(props) {

    const {producto, restarProductos, aumentarProductos, index, eliminarProductoPedido} = props;
    
    const { _id, nombre, precio, imagen } = producto

  return (
    <li>
            <div className="texto-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">${precio}</p>
                <img className="imagen" src={`http://localhost:5000/${imagen}`} alt="Imagen producto" width={65} />
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i 
                    className="fas fa-minus"
                    onClick={() => restarProductos(index)}></i>
                    <p>{producto.cantidad}</p>
                    <i 
                    className="fas fa-plus"
                    onClick={() => aumentarProductos(index)}></i>
                </div>
                <button type="button" 
                        className="btn btn-rojo"
                        onClick={() => eliminarProductoPedido(producto.producto)}
                        >
                    <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
            </div>
        </li>
  )
}

export default FormCantidadProducto