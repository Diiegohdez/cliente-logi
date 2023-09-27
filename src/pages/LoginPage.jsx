import React, { useEffect } from 'react';
import "./loginPage.css";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signin, erro, isAuth } = useAuth();// informacion del context

    const navigate = useNavigate();

    const onsubmit = handleSubmit((data) => {
        signin(data);
    });

    useEffect(() => {
        if(isAuth) navigate("/tasks");
    }, [isAuth])

    return (
        <div className='login'>

            <form onSubmit={onsubmit} className='form-login'>
                {erro.map((error, i) => (
                    <div key={i} className='error-form'>{error}</div>
                ))}
                <h1>Login</h1>
                <input type='email' {...register("email", { required: true })} placeholder=' Correo' />
                {errors.email && <p className='error-register'>El Correo es Obligatorio</p>}
                <input type='password' {...register("password", { required: true })} placeholder='Contraseña' />
                {errors.password && <p className='error-register'>La Contraseña es Obligatorio</p>}
                <button type='submit'>
                    Login
                </button>
                <p>No tienes una cuenta?  <Link to="/register">Registrarse</Link></p>
            </form>

        </div>
    )
};

export default LoginPage;