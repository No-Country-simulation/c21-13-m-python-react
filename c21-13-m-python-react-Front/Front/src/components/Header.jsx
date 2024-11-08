import React from 'react'
import logo from '../assets/LogoLibro.svg'
import { useNavigate } from 'react-router-dom'
import line from '../assets/line.png'





const Header = () => {

    const navigate = useNavigate()

    /* Buscar en el localstorage si hay usuario loggeado */
    const isLoggedIn = Boolean(localStorage.getItem('token'));


    const cerrarSesion = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        if (localStorage.getItem('username')) {
            localStorage.removeItem('username');
        }
        if (localStorage.getItem('email')) {
            localStorage.removeItem('email');
        }
        navigate('/login')
    }

  return (
    <>    
    <header className="p-4 bg-gray-800/50 backdrop-blur-sm relative z-10">
        <nav className="container mx-auto flex justify-between items-center">              
            <div id='logo-y-libro' className="flex gap-2 items-center">                
                <img src={logo} className="w-[20px]" alt="" />
                <h1 className="text-2xl font-semibold text-white">
                    profevirtual
                </h1> 
            </div>
            <div id='fila-opciones' className='flex gap-6'>
                <button className='text-sm text-white' onClick={() => navigate('/todosloscursos')}>
                    Cursos
                </button>

                {/* si el usuario está loggeado */}
                {!isLoggedIn && (
                            <button
                                className="text-sm text-white"
                                onClick={() => navigate('/login')}
                            >
                                Inicia Sesión
                            </button>
                        )}                

                {/* si el usuario está loggeado */}
                {isLoggedIn && (     
                <button className='text-sm text-white' onClick={() => navigate('/profile')}>
                    Mi perfil
                </button>
                )}

                {/* si el usuario está desloggeado onClick={handleCerrarSesion}  */}
                {isLoggedIn && (
                <button className='text-sm text-white' onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
                )}
            </div>                                           
        </nav>
    </header>
    <img className="w-full" src={line} alt=""/>
    </>
  )
}

export default Header
