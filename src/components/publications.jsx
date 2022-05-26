import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {NavLink,Link,useNavigate}from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Publications(){
    const cookie=new Cookies();
    const navigate= useNavigate();
    const [products,setProducts]= useState([]);

    useEffect(()=>{publicationsAll();},[0]);

    async function publicationsAll(){
        let cookie=new Cookies()    ;
        const response=await axios({
            method: 'get',
            url:'/products/all',
            headers: { Authorization: `Bearer ${cookie.get('token')}` }
        });
        if(response.status !== 401)setProducts(response.data);
    }

    function loadUser(){
        return navigate('/user');   
    };

    function loadPublications(){
        return navigate('/publications');
    };


    return (
        <div>
            <nav className="navbar">
              <button onClick={()=>loadPublications()} className="option option-main"><img src="/atom.png" width="20" height="20"/></button>
              <div className="options">
                <button className="option-acces option" onClick={()=>loadUser()}>{cookie.get('username')}</button>
                <Link to="/" className="option option-acces">Logout</Link>
              </div>
            </nav>
            <main className="container">
            <section className="products">
                    {
                        (products.length > 0)?
                        <div className="product-list">
                        {products.map((item,index) => {
                            return <div key={index} className="product-item">
                                <Link to={"/publications/"+item._id} state={{name:item.name,id:item._id,image:item.url_image,description:item.description,price:item.price}} key={item.name} className="product-title">
                                    {item.name}</Link>
                                <img src={"http://localhost:3000/"+item.url_image}  className="image-product"/>
                                <p>{item.description}</p>
                                <p className="product-price">${item.price}</p>
                            </div>
                        })}
                        </div>
                    :<p className="products-notFound">No Products Published</p>
                    }
                </section>
            </main>
        </div>
    );

};