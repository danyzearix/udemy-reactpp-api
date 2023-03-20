import React, {Fragment, useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

//Cliente = state, Guardar cliente = funcion para guardar el statre
function EditarCliente(props) {
    let navigate = useNavigate();

    //Id de cliente
    const {id} = useParams();
    console.log(id)

    const [cliente, datosCliente] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: ""
    });

    //useEffect, cuando el componente se carga
    useEffect(()=>{
        consultarApi();
    },[id])

    //Query a la API 
    const consultarApi = async() => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        //Colocar en el state
        datosCliente(clienteConsulta.data);
    }

    //Leer datos del formulario
    const actualizarState = e => {
        //Almacenar lo  que el cliente escribe
        datosCliente({
            //...cliente guarda una copia del state actual para mantener en memoria toda la información que se escribe
            ...cliente,
            [e.target.name] : e.target.value
        })

    }

    //Enviar peticion por axios para actualizar cliente
    const actualizarCliente = e =>{
        e.preventDefault();

        //Enviar peticios por axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
        .then(res =>{
            if (res.data.code === 11000) {
                Swal.fire({
                    icon: 'error',
                    title: "Hubo un error",
                    text: "Cliente ya esta registrado"
                }
                    
                  )
                console.log("Error de duplicado de mongo")
            }else{
                console.log(res.data);
                Swal.fire(
                    'Correcto',
                    'Se actualizó el registro correctamente',
                    'success'
                    
                  )
            }
            //Redireccionar
            navigate('/',{replace:true});
        })
    }

    //Validar el form
    const validarCliente = () =>{
        //destructuring
        const {nombre, apellido, email, empresa, telefono} = cliente;

        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
        //true o false
        return valido;
    }

  return (
   <Fragment>
    <h2>Editar Cliente</h2>
        <form
            onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                            value={cliente.nombre}
                            />
                            
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente"  
                            name="apellido"
                            onChange={actualizarState}
                            value={cliente.apellido}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text" 
                            placeholder="Empresa Cliente" 
                            name="empresa"
                            onChange={actualizarState}
                            value={cliente.empresa}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email"     
                            placeholder="Email Cliente" 
                            name="email"
                            onChange={actualizarState}
                            value={cliente.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="number" 
                            placeholder="Teléfono Cliente" 
                            name="telefono"
                            onChange={actualizarState}
                            value={cliente.telefono}/>
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Guardar cambios"
                                //() la función se carga tan pronto se monte el componente
                                disabled={validarCliente()}/>
                </div>

        </form>
   </Fragment>
  )
}

export default EditarCliente