import React,{useState} from 'react';
import {Link}from 'react-router-dom';
import Cookies from 'universal-cookie';
import Create from'./create';
import Products from'./products';

export default function User(){
    let [forms,setForms]=useState(false);
    let cookie=new Cookies();

    function changes(select){
        if(select==="a")setForms(false);
        else setForms(true);
    }

    return(
        <div>
            <nav className="navbar">
              <Link to="/" className="option option-main"><img src="/atom.png" width="20" height="20"/></Link>
              <div className="options">
                <h4 className="option-acces title-username-nav">{cookie.get('username')}</h4>
                <Link to="edit" className="option option-acces">Edit Data</Link>
                <Link to="/" className="option option-acces">Logout</Link>
              </div>
            </nav>
            <main className="container">
                <section className="main-post">
                    <button className="option option-acces" onClick={()=>changes("a")}>My Products</button>
                    <button className="option option-acces" onClick={()=>changes("b")}>Create Product</button>
                </section>
                <section className="main-post">
                {
                    (forms === false)?<Products/>:<Create/>
                }
                </section>

            </main>
        </div>
    );
};