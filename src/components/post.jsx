import React,{useState,useEffect} from 'react';
import {useNavigate,useLocation}from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Cookies from 'universal-cookie';
import axios from 'axios';

export default function Post(){
    const {register,handleSubmit,formState: { errors }} = useForm();

    const cookie=new Cookies();
    let [comments,setComments]= useState([]);
    const navigate=useNavigate();
    const location=useLocation();
    const name=location.state.name;
    const image=location.state.image;
    const description=location.state.description;
    const price=location.state.price;

    useEffect(()=>{loadComments()},[0]);

    async function loadComments(){
        let id=location.state.id;
        const response=await axios({
            url:`/comments/${id}`,
            method: 'get',
            headers: { Authorization: `Bearer ${cookie.get('token')}` }
        });
        await setComments(response.data.reverse());
    };

    function loadUser(){
        return navigate('/user');   
    };

    function loadPublications(){
        return navigate('/publications');
    };

    async function createComment(data,e){
        console.log(data);
        console.log(data.comment);
        await axios({
            url:`/comments/new/${location.state.id}`,
            method: 'post',
            data:{
                comment:data.comment,
                username:cookie.get('username')
            },
            headers: { Authorization: `Bearer ${cookie.get('token')}` }
        });
        e.target.reset();
        setComments([...comments,{comment:data.comment,username:cookie.get('username')}]);
    };

    return(
        <div>
            <nav className="navbar">
              <button onClick={()=>loadPublications()} className="option option-main"><img src="/atom.png" width="20" height="20"/></button>
              <div className="options">
                <button className="option-acces option" onClick={()=>loadUser()}>{cookie.get('username')}</button>
              </div>
            </nav>
            <main className="container">
            <section className="products">
                <div className="publication">
                    <p className="text-publication title-publication">{name}</p>
                    <img src={"http://localhost:3000/"+image}  className="post-image-product"/>
                    <p>{description}</p>
                    <p className="text-publication">Price: ${price}</p>
                    <div className="comments">
                        <form onSubmit={handleSubmit(createComment)} className="form-comment">
                            <input type="text" name="comment" className="comment-input" maxlength="90"
                            {...register('comment', { required: true,message:'Comment Required'})}/>
                            <button type="submit" className="option option-acces">Comment</button>
                        </form>
                        <p className="last-comments">Last Comments</p>
                        {
                            comments.map((item,index)=>{
                            return <div key={index}>
                                <p className="text-username">{item.username}</p>
                                <p className="text-comment">{item.comment}</p>
                            </div>
                            })
                        }
                    </div>
                </div>
            </section>
            </main>
        </div>
    );
};