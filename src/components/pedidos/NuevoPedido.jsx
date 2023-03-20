import React, {useEffect, useState, Fragment} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

function NuevoPedido() {
    let navigate = useNavigate();
    //Extraer ID de cliente
    const { id } = useParams();

    //state
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState("");
    const [productos, guardarProductos] =useState ([]);
    const [total, guardarTotal] = useState(0);


    
    //Use effect para montar el componente con los datos
    useEffect(() => {
        //Obtener el cliente
        const consultarApi = async () =>{
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data)
        }

        //Ejecutar el llamado a la API
        consultarApi();

        //Actualizar el total
        actualizarTotal();
    },[productos, id]);

    const buscarProducto = async e =>{
        e.preventDefault();
        //Obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        //Si no hay resultados alerta, else agregar al state
        if (resultadoBusqueda.data[0]) {
            let productoResultado = resultadoBusqueda.data[0];
            //Agregar la llave de producto (copia de id) agrega la key de cantidad ya que el objeto id no la tiene
            productoResultado.producto = resultadoBusqueda.data[0]._id
            productoResultado.cantidad = 0;

            //ponerlo en el state
            guardarProductos([...productos, productoResultado])
        }else{
            //No hay resultador
            Swal.fire({
                type: "error",
                title: "No hay resultados",
                text: "No hay resultados para la búsqueda"
            })
        }
    }
    //Almacenar una busqueda
    const leerDatosBusqueda = e =>{
        guardarBusqueda(e.target.value);
    };

    //Actualizar la cantidad de productos
    const restarProductos = i => {
        //Copiar el arreglo original 
        const todosProductos = [...productos];
        //validar si esta en 0 no puede ir más allá
        if(todosProductos[i].cantidad === 0) return;
        //Decremento
        todosProductos[i].cantidad--;
        //Almacenar en el state
        guardarProductos(todosProductos);
    }

    const aumentarProductos = i => {
        //Copiar el arreglo original 
        const todosProductos = [...productos];
        //Incremento 
        todosProductos[i].cantidad++
        //Almacenar en el state
        guardarProductos(todosProductos);
    }

    //  Eliminar un producto del state
    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id);
        guardarProductos(todosProductos);
    }

    //Actualizar total
    const actualizarTotal = () => {
        //Si el array de productos es igual a 0 total es 0
        if (productos.length === 0) {
            guardarTotal(0);
            return;
        } 

        //Calcular total nuevo
        let nuevoTotal = 0;
        
        //Recorrer todo el array de productos y sus cantidades, precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));
        guardarTotal(nuevoTotal)

    }

    //Almacena el pedido en la DB
    const realizarPedido = async e => {
        e.preventDefault();

        //Construir objeto de pedido
        const pedido ={
            "cliente" : id,
            "pedido" : productos,
            "total" : total
        }
        //Almacenarlo en mongo
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        //leer resultado
        if (resultado.status === 200) {
            Swal.fire({
                type: "sucess",
                title: "Realizado",
                text: "Pedido agregado correctamente"
            })
        } else {
            Swal.fire({
                type: "error",
                title: "Hubo un error",
                text: "Vuelva a intentarlo"
            })
        }

        //Redireccionar a pedidos 
        navigate('/pedidos',{replace:true});
    }

    return (
    <Fragment>
        <h2>Nuevo Pedido</h2>

<div className="ficha-cliente">
    <h3>Datos de cliente</h3>
    <p>{cliente.nombre} {cliente.apellido}</p>
    <p>{cliente.email}</p>
</div>

    <FormBuscarProducto
        buscarProducto = {buscarProducto}
        leerDatosBusqueda = {leerDatosBusqueda}
    />

<ul className="resumen">
        {productos.map((producto, index) => (
            <FormCantidadProducto 
                key={producto.producto}
                producto={producto}
                restarProductos={restarProductos}
                aumentarProductos={aumentarProductos}
                eliminarProductoPedido={eliminarProductoPedido}
                index={index}
            /> 
        ))}
          
        
</ul>
    
    <p className='total'>Total a pagar: <span>$ {total} </span></p>

    { total > 0 ? (
        <form
        onSubmit={realizarPedido}>
            <input type="submit" 
                   className='btn btn-verde btn-block'
                   value="Realizar pedido" />
        </form>
    ) : null}

    </Fragment>
  )
}

export default NuevoPedido