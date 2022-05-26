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
    
    useEffect(()=>{isAuthenticated()},[0]);

    async function isAuthenticated(){
        let cookie = new Cookies();
        const response = await axios({
            url:'/authenticated',
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

    return(
        <div>
            <nav className="navbar">
              <button onClick={()=>loadPublications()} className="option option-main"><img src="/atom.png" width="20" height="20"/></button>
                <div className="options">
                    <Link to="/user" className="option option-acces">{cookie.get('username')}</Link>
                    <Link to="/" className="option option-acces">Logout</Link>
                </div>
            </nav>
            <main className="container">
              <section className="main-post">
                  <form onSubmit={handleSubmit(Update)} className="form-data">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className="input-data" 
                        {...register('username', { required: true,message:'Username Required'})}/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className="input-data" 
                        {...register('email', { required: true,message:'Email Required'})}/>
                    <label htmlFor="password">Old Password</label>
                    <input type="password" name="password" className="input-data" 
                        {...register('password', { required: true,message:'Password Required'})}/>
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" name="newPassword" className="input-data" 
                        {...register('newPassword', { required: true,message:'Password Required'})}/>
                    <button type="submit" className="option option-acces btn-send">Update</button>
                  </form>
              </section>
            </main>
        </div>
    );
};
