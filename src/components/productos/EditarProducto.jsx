import {React, Fragment, useState, useEffect} from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from "../layout/Spinner";

function EditarProducto(props) {

  let navigate = useNavigate();

  //Pasar el ID por parametros
  const { id } = useParams();
  
  //producto = state, y función para actualizar el estado
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
    imagen: ""
  });

  //archivo = state, guardarArchivo = setState
  const [archivo, guardarArchivo] = useState('');

  //Cuando el componente cargue
  useEffect (() => {
    //Consultar la API
  const consultarApi = async () =>{
    const productosConsulta = await clienteAxios.get(`/productos/${id}`);
    guardarProducto(productosConsulta.data);
  }
  consultarApi();
  }, [id])

  //Edita un producto en la base de datos
  const editarProducto = async e => {
    e.preventDefault();
    //Crear un form data 
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio",producto.precio);
    formData.append("imagen", archivo);

    //Almacenar en la base con try y catch
    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData,{
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });
      //Alerta exitosa
      if (res.status === 200) {
        Swal.fire(
          "Editado correctamente",
          res.data.mensaje,
          "success"
        )
      }

      //Redireccionar a productos
      navigate('/productos',{replace:true});

    } catch (error) {
      Swal.fire({
        type: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo"
      })
    } 
  }

  //Leer datos del form
  const leerInformacionProducto = e => {
    guardarProducto({
  //Obtener una copia del state y agregar el nuevo estado 
      ...producto,
      [e.target.name] : e.target.value
    })
  
  }
  //Leer archivo del form
 const leerArchivo = e => {
    guardarArchivo(e.target.files[0])
  }

  //Extraer lo valores del state

  const { nombre, precio, imagen } = producto;

  if (!nombre) return <Spinner/>

  return (
    <Fragment>
      <h2>Editar producto</h2>
      <form onSubmit={editarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Producto" 
                            name="nombre"
                            defaultValue={nombre}
                            onChange={leerInformacionProducto}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input  type="number" 
                            name="precio" 
                            min="0.00" 
                            step="1000" 
                            placeholder="Precio"
                            defaultValue={precio}
                            onChange={leerInformacionProducto} />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    { imagen ? (
                      <img src={`http://localhost:5000/${imagen}`} alt="imagenproducto" width="300" />
                    ) : null}
                    <input  type="file"  
                            name="imagen" 
                            //multiple agrega muchos archivos a la vez
                            onChange={leerArchivo}/>

                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Editar Producto"/>
                </div>
            </form>
    </Fragment>
  )
}

export default EditarProducto