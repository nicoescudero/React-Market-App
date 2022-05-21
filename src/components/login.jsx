import React from 'react';
import {Link,useNavigate}from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import Cookie from 'universal-cookie';

import "../App.css";
const Login=()=>{
    const {register,handleSubmit,formState: { errors }} = useForm();
    let navigate = useNavigate();
    const cookie=new Cookie();
    
    const onSubmit=async(data,e)=>{
        const response=await axios.post('/user/signIn',{
            email: data.email,
            password: data.password
        });
        if(response.status === 200){
            cookie.set('token',response.data.token);
            cookie.set('username',response.data.user.userName);
            cookie.set('email',response.data.user.email);
            return navigate('/user');
        }
        e.target.reset();
    };
    return(
        <div>
            <nav className="navbar">
              <Link to="/" className="option option-main"><img src="/atom.png" width="20" height="20"/></Link>
              <div className="options">
                  <p className="option-acces">Login</p>
              </div>
            </nav>
            <main className="container">
                <section className="main-post">
                    <form onSubmit={handleSubmit(onSubmit)} className="form-data">
                        <input  type="email" name="email" id="email" placeholder="Ingresar Email" className="input-data" 
                            {...register('email', { required: true,message:'Email Required'})}/>
                        <input  type="password" name="password" id="password" placeholder="Ingresar Contraseña" className="input-data" 
                            {...register('password', { required: true,message:'Password Required'})}/>
                        <button type="submit" className="btn-send">Login</button>
                    </form>
                    <span>
                    {errors.username && errors.email && errors.password}
                    </span>
                </section>
            </main>
        </div>
    );
};

export default Login;