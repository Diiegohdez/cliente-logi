import React from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuth, user, logout } = useAuth();
    return (
        <nav>
            <Link to={
                isAuth ? "/tasks" : "/"
            }>
                <h1>Administracion</h1>
            </Link>
            <ul>
                {isAuth ? (
                    <>
                        <li>
                            Bienvenido<p className='name-user'>{user.username}</p>
                        </li>
                        <li>
                            <Link to="/tasks" className='btn-navbar'>Notas</Link>
                        </li>
                        <li>
                            <Link to="/add-task" className='btn-navbar'>Agregar</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={() => logout()} className='btn-navbar'>Salir</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/register" className='btn-navbar'>Registro</Link>
                        </li>
                        <li>
                            <Link to="/login" className='btn-navbar'>Ingresar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;