import React from 'react';
import {Link,useNavigate}from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import Cookie from 'universal-cookie';

import "../App.css";
export default function Login(){
        const {register,handleSubmit,formState: { errors }} = useForm();
        let navigate = useNavigate();
        const cookie=new Cookie();
    
    async function onSubmit(data,e){
        try {
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
        } catch (error) {
            return navigate('/login');
        }
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
                    <label htmlFor="email">Email</label>
                    <input  type="email" name="email" className="input-data" maxlength="40"
                        {...register('email', { required: true,message:'Email Required'})}/>
                    <label htmlFor="password">Password</label>
                    <input  type="password" name="password" id="password" className="input-data" maxlength="30"
                        {...register('password', { required: true,message:'Password Required'})}/>
                        <button type="submit" className="option option-acces btn-send">Login</button>
                    </form>
                    <span>
                    {errors.message}
                    </span>
                </section>
            </main>
        </div>
    );
};