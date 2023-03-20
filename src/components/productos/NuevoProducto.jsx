import {React, Fragment, useState} from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate} from 'react-router-dom';

function NuevoProducto() {

  let navigate = useNavigate();
  //Producto = state , guardarProducto = setState
  const [producto, guardarProducto] = useState({
    nombre:'',
    precio: ''
  });

  //archivo = state, guardarArchivo = setState
  const [archivo, guardarArchivo] = useState('');

  //Almacena nuevo producto en Mongo y sube archivo al server
  const agregarProducto = async e => {
    e.preventDefault();

    //Crear un form data 
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio",producto.precio);
    formData.append("imagen", archivo);

    //Almacenar en la base con try y catch
    try {
      const res = await clienteAxios.post("/productos", formData,{
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });
      //Alerta exitosa
      if (res.status === 200) {
        Swal.fire(
          "Agregado correctamente",
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

  //Guardar producto y archivo en la API

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

  return (
    <Fragment>
      <h2>Agregar producto</h2>
      <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Producto" 
                            name="nombre"
                            onChange={leerInformacionProducto}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input  type="number" 
                            name="precio" 
                            min="0.00" 
                            step="1000" 
                            placeholder="Precio"
                            onChange={leerInformacionProducto} />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input  type="file"  
                            name="imagen" 
                            //multiple agrega muchos archivos a la vez
                            onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Agregar Producto"/>
                </div>
            </form>
    </Fragment>
  )
}

export default NuevoProducto