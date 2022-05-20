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
        console.log(`RESPONSE: ${response}`);
        e.target.reset();
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-data">
            <input type="text" name="name" placeholder="Product Name" className="input-data" 
                {...register('name', { required: true,message:'Product Name Required'})}/>
            <input type="number" name="price" placeholder="Price" className="input-data" 
                {...register('price', { required: true,message:'Price Required'})}/>

            <input type="file" name="image" className="input-data" 
                {...register('image', { required: true,message:'Image Required'})}/>
            <textarea name="description" placeholder="Description" 
                {...register('description', { required: true,message:'Description Required'})}/>
            <button type="submit" className="btn-send">Create</button>
        </form>
    );
};