import React,{useState} from 'react';
import { useForm } from 'react-hook-form'
import Cookies from 'universal-cookie';
import axios from 'axios';
export default function Create(){
    const {register,handleSubmit,formState: { errors }} = useForm();
    const cookie=new Cookies;

    async function onSubmit(data,e){
        console.log(data);
        console.log(e);
        const formData=new FormData();
        formData.append('name',data.name);
        formData.append('price',data.price);
        formData.append('description',data.description);
        formData.append('image',data.image[0]);
        const response= await axios({
            url:'/products/new',
            method:'post',
            data: formData,
            headers: { Authorization: `Bearer ${cookie.get('token')}` }
        });
        e.target.reset();
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-data">
            <label htmlFor="name">Product Name</label>
            <input type="text" name="name" className="input-data" maxlength="50"
                {...register('name', { required: true,message:'Product Name Required'})}/>
            <label htmlFor="price">Price</label>
            <input type="number" name="price" className="input-data" min="0" max="9000000"
                {...register('price', { required: true,message:'Price Required'})}/>
            <label htmlFor="image">Image</label>
            <input type="file" name="image" className="input-data" 
                {...register('image', { required: true,message:'Image Required'})}/>
            <label htmlFor="description">Description</label>
            <textarea name="description" wrap="physicaly" rows="3" cols="10" maxlength="100"
                {...register('description', { required: true,message:'Description Required'})}/>
            <button type="submit" className="option option-acces btn-send">Create</button>
        </form>
    );
};