import React from 'react';
import {Link}from 'react-router-dom';
import "../App.css";
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = ()=>{
    const {register,handleSubmit,formState: { errors }} = useForm();
    const onSubmit=async(data,e)=>{
        const response=await axios.post('/user/signUp',{
          userName: data.username,
          email: data.email,
          password: data.password
        });
        console.log(`RESPONSE: ${response}`);
        e.target.reset();
    };


    return(
        <div>
            <nav className="navbar">
              <Link to="/" className="option option-main"><img src="/atom.png" width="20" height="20"/></Link>
              <div className="options">
                  <p className="option-acces">Register</p>
              </div>
            </nav>
            <main className="container">
                <section className="main-post">
                <form onSubmit={handleSubmit(onSubmit)} className="form-data">
                    <input  type="text" name="username" id="username" placeholder="Ingresar Username" className="input-data" 
                        {...register('username', { required: true,message:'Username Required'})}/>
                    <input  type="email" name="email" id="email" placeholder="Ingresar Email" className="input-data" 
                        {...register('email', { required: true,message:'Email Required'})}/>
                    <input  type="password" name="password" id="password" placeholder="Ingresar Contraseña" className="input-data" 
                        {...register('password', { required: true,message:'Password Required'})}/>
                    <button type="submit" className="btn-send">Register</button>
                </form>
                <span>
                    {errors.username && errors.email && errors.password}
                </span>
                </section>
            </main>
        </div>
    );
};

export default Register;