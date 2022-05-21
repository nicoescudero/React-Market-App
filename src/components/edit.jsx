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
        <form onSubmit={handleSubmit(Update)} className="formUpdate">
            <input type="text" name="name" className="input-data" {...register('name', { required: true,message:'Product Name Required'})}/>
            <input type="number" name="price" className="input-data" {...register('price', { required: true,message:'Price Required'})}/>
            <input type="file" name="image" className="input-data" {...register('image', { required: true,message:'Image Required'})}/>
            <textarea name="description" {...register('description', { required: true,message:'Description Required'})}/>
            <button onClick={()=>hideForm()} className="btn-send">Cancel</button>
            <button type="submit" className="btn-send">Update</button>
        </form>
    );
};