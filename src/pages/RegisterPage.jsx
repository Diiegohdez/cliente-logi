import {useEffect} from 'react';
import { useForm } from "react-hook-form";
import "./registrePage.css";
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';



const RegisterPage = () => {

    const { register, handleSubmit, formState:{errors} } = useForm();
    const {signup, isAuth, erro } = useAuth();
    const navigate = useNavigate()

    //redirecionar si esta autentificado
    useEffect(()=>{
        if(isAuth) navigate("/tasks");
    }, [isAuth]);
    
    //enviar informacion de registro al back-end
    const onsubmit = handleSubmit(async (values) => {
        signup(values);
    });

    useEffect(() => {
        if(isAuth) navigate("/add-task");
    }, [isAuth])

    return (
        <div className='register'>
            <form onSubmit={onsubmit} className='form-register'>
            {erro.map((error, i )=>(
                <div key={i} className='error-form'>{error}</div>
            ))}
            <h1>Registro</h1>
                <input type='text' {...register("username", { required: true })} placeholder='Nombre' />
                {errors.username && <p className='error-register'>El Nombre es Obligatorio</p>}
                <input type='email' {...register("email", { required: true })} placeholder=' Correo' />
                {errors.email && <p  className='error-register'>El Correo es Obligatorio</p>}
                <input type='password' {...register("password", { required: true })} placeholder='Contraseña' />
                {errors.password && <p  className='error-register'>La Contraseña es Obligatorio</p>}
                <button type='submit'>
                    Registro
                </button>
                <p>ya tienes una cuenta? <Link to="/login">Iniciar Sesion</Link></p>
            </form>
        </div>
    )
};

export default RegisterPage;