import React,{useEffect} from 'react';
import { useForm} from 'react-hook-form'
import Cookies from 'universal-cookie';
import axios from 'axios';
import {Link,useNavigate} from "react-router-dom";

export default function Data(){
    const cookie=new Cookies();
    const navigate=new useNavigate();
    const {register,handleSubmit,formState: { errors }} = useForm({defaultValues:{
        username:cookie.get('username'),
        email:cookie.get('email'),
    }});
    
    useEffect(()=>{isAuthenticated();},[]);

    async function isAuthenticated(){
        let cookie = new Cookies();
        const response = await axios({
            url:'http://localhost:3000/authenticated',
            method:'get',
            headers: { Authorization: `Bearer ${cookie.get('token')}` }
        });
        if(response.status === 401)return navigate('/login');
        else return ;
    };

    async function Update(data,e){
        let formdata={
            userName:data.username,
            email:data.email,
            password:data.password,
            newPassword:data.newPassword
        };
        const response=await axios({
            url:`/user/update`,
            method:'put',
            data:formdata,
            headers: { Authorization: `Bearer ${cookie.get('token')}` }
        })
        if(response.status === 200){
            console.log(response);
            cookie.set('username',response.data.user.userName);
            cookie.set('email',response.data.user.email);
            return navigate('/user');
        };
        e.target.reset();
    };

    function loadPublications(){
        return navigate('/publications');
    }

    async function Logout(){
        await cookie.remove('token');
        await cookie.remove('username');
        await cookie.remove('email');
        return navigate('/');
    };

    /* eslint-disable no-useless-escape */

    return(
        <div>
            <nav className="navbar">
              <button onClick={()=>loadPublications()} className="option option-main"><img src="/atom.png" alt="" width="20" height="20"/></button>
                <div className="options">
                    <Link to="/user" className="option option-acces">{cookie.get('username')}</Link>
                    <button onClick={()=>Logout()} className="option option-acces">Logout</button>
                </div>
            </nav>
            <main className="container">
              <section className="main-post">
                  <form onSubmit={handleSubmit(Update)} className="form-data">
                    <label htmlFor="username">Username</label>
                    <input  type="text" name="username" className="input-data" maxLength="20" 
                        {...register('username', { required: {value: true,message:'Username Required'}, pattern:{ value: /^[a-z0-9_-]{3,16}$/, message:'Username must not contain spaces and special characters.'}})}/>
                        <span className="errors">{errors.username?.message}</span>
                    <label htmlFor="email">Email</label>
                    <input  type="email" name="email" className="input-data" maxLength="40"
                        {...register('email', { required: {value:true, message:'Email Required'}, pattern: {value: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,message: 'Insert a valid Email'}})}/>
                        <span className="errors">{errors.email?.message}</span>
                    <label htmlFor="password">Old Password</label>
                    <input  type="password" name="password" className="input-data" maxLength="30"
                        {...register('password', { required: {value:true,message:'Old Password Required'},minLength:{value:8, message:'Minimum 8 characters'}})}/>
                        <span className="errors">{errors.password?.message}</span>
                    <label htmlFor="newPassword">New Password</label>
                    <input  type="password" name="newPassword" className="input-data" maxLength="30"
                        {...register('newPassword', { required: {value:true,message:'New Password Required'},minLength:{value:8, message:'Minimum 8 characters'}})}/>
                        <span className="errors">{errors.newPassword?.message}</span>
                    <button type="submit" className="option option-acces btn-send">Update</button>
                  </form>
              </section>
            </main>
        </div>
    );
};
