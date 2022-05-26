import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'universal-cookie';


export default function Edit(props){
    const {register,error,handleSubmit}=useForm({
        defaultValues:props.productData
    });

    const cookie=new Cookies;

    function hideForm(){
        props.setUpdateForm(false);
    };

    async function Update(data,e){
        let formdata=new FormData();
        formdata.append('name',data.name);
        formdata.append('description',data.description);
        formdata.append('price',data.price);
        formdata.append('image',data.image[0]);
        const response=await axios({
            url:`/products/update/${props.productData.id}`,
            method:'put',
            data:formdata,
            headers: { Authorization: `Bearer ${cookie.get('token')}` }
        })
        if(response.status === 200){
            props.cargar();
            props.setUpdateForm(false);
        };
        e.target.reset();
    };

    return(
        <form onSubmit={handleSubmit(Update)} className="form-data formUpdate">
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
            <button onClick={()=>hideForm()} className="option option-acces btn-send">Cancel</button>
            <button type="submit" className="option option-acces btn-send">Update</button>
        </form>
    );
};