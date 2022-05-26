import React from 'react';
import '../App.css';
import {Link}from 'react-router-dom';


const home=()=>{
  return(
    <div>
      <nav className="navbar">
        <Link to="/" className="option option-main"><img alt="" src="/atom.png" width="20" height="20"/></Link>
        <div className="options">
        <Link to="login" className="option option-acces">Login</Link>
        <Link to="register" className="option option-acces">Signup</Link>
        </div>
      </nav>
      <main className="container">
        <section className="main-post">
          <div className="main-resource">
            <img alt="" src="https://cdn-icons-png.flaticon.com/512/1440/1440602.png" className="main-logo"/>
            <p className="main-message">Bienvenido a Atomik!</p>
          </div>
            <img alt="" src="/students.jpg"/>
        </section>
      </main>
      </div>
    );
};

export default home;