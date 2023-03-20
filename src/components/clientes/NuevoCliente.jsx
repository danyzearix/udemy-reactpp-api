import React, {Fragment, useState} from 'react'
import Swal from 'sweetalert2';
import { useNavigate} from 'react-router-dom';
import clienteAxios from '../../config/axios';

//CLiente = state, Guardar cliente = funcion para guardar el statre
function NuevoCliente() {
    let navigate = useNavigate();
    const [cliente, guardarCliente] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: ""
    });

    //Leer datos del formulario
    const actualizarState = e => {
        //Almacenar lo  que el cliente escribe
        guardarCliente({
            //...cliente guarda una copia del state actual para mantener en memoria toda la información que se escribe
            ...cliente,
            [e.target.name] : e.target.value
        })

    }

    //Añade un nuevo cliente a la REST API
    const agregarCliente = e =>{
        e.preventDefault();
        //Enviar petición a axios
        clienteAxios.post("/clientes", cliente)
        .then(res =>{
            //Validar si hay errores al escribir la base de mongo
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
                    'Se agrego el Cliente',
                    res.data.mensaje,
                    'success'
                    
                  )
            }
            //Redireccionar
            navigate('/',{replace:true});
            
        });
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
    <h2>Nuevo Cliente</h2>
        <form 
        onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                            />
                            
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente"  
                            name="apellido"
                            onChange={actualizarState}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text" 
                            placeholder="Empresa Cliente" 
                            name="empresa"
                            onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email"     
                            placeholder="Email Cliente" 
                            name="email"
                            onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="number" 
                            placeholder="Teléfono Cliente" 
                            name="telefono"
                            onChange={actualizarState}/>
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Agregar Cliente"
                                //() la función se carga tan pronto se monte el componente
                                disabled={validarCliente()}/>
                </div>

        </form>
   </Fragment>
  )
}

export default NuevoCliente