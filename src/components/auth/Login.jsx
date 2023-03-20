import React from 'react'

function Login() {
    const leerDatos = () =>{
        console.log("Algo")
    }
  return (

    <div className='login'>
        <h2>Iniciar Sesión</h2>
        <div className='contenedor-formulario'>
            <form>
                <div className="campo">
                    <label>Email</label>
                    <input 
                            type="text" 
                            name="email"
                            placeholder='Email para iniciar sesion'
                            required
                            onChange={leerDatos}/>
                </div>

                <div className="campo">
                    <label>Password</label>
                    <input 
                            type="password" 
                            name="password"
                            placeholder='Password para iniciar sesion'
                            required
                            onChange={leerDatos}/>
                </div>
            </form>
                <input type="submit" value="Iniciar sesión" className='btn btn-verde btn-block'/>

        </div>
    </div>

  )
}

export default Login