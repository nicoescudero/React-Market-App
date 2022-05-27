import React from 'react';
import {Link,useNavigate}from 'react-router-dom';
import "../App.css";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'universal-cookie';


const Register = ()=>{
    const cookie=new Cookies();
    let navigate = useNavigate();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const onSubmit=async(data,e)=>{
        const response=await axios.post('/user/signUp',{
          userName: data.username,
          email: data.email,
          password: data.password
        });
        if(response.status===201){
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
                  <p className="option-acces">Register</p>
              </div>
            </nav>
            <main className="container">
                <section className="main-post">
                <form onSubmit={handleSubmit(onSubmit)} className="form-data">
                    <label htmlFor="username">Username</label>
                    <input  type="text" name="username" className="input-data" maxlength="20" 
                        {...register('username', { required: {value: true,message:'Username Required'}, pattern:{ value: /^[a-z0-9_-]{3,16}$/, message:'Username must not contain spaces and special characters.'}})}/>
                        <span className="errors">{errors.username?.message}</span>
                    <label htmlFor="email">Email</label>
                    <input  type="email" name="email" className="input-data" maxlength="40"
                        {...register('email', { required: {value:true, message:'Email Required'}, pattern: {value: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,message: 'Insert a valid Email'}})}/>
                        <span className="errors">{errors.email?.message}</span>
                    <label htmlFor="password">Password</label>
                    <input  type="password" name="password" id="password" className="input-data" maxlength="30"
                        {...register('password', { required: {value:true,message:'Password Required'},minLength:{value:8, message:'Minimum 8 characters'}})}/>
                        <span className="errors">{errors.password?.message}</span>
                    <button type="submit" className="option option-acces btn-send">Register</button>
                </form>
                </section>
            </main>
        </div>
    );
};

export default Register;