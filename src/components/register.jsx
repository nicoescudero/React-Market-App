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
                        {...register('username', { required: true,message:'Username Required'})}/>
                    <label htmlFor="email">Email</label>
                    <input  type="email" name="email" className="input-data" maxlength="40" 
                        {...register('email', { required: true,message:'Email Required'})}/>
                    <label htmlFor="password">Password</label>
                    <input  type="password" name="password" className="input-data" maxlength="30" 
                        {...register('password', { required: true,message:'Password Required'})}/>
                    <button type="submit" className="option option-acces btn-send">Register</button>
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