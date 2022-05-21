import React,{useState,useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Edit from './edit';

export default function Products(){

    const cookie=new Cookies();
    const [userData,setUserData] = useState([]);
    const [updateForm,setUpdateForm]= useState(false);
    var [productData,setProductData]=useState({
        id:'',
        name:'',
        description:'',
        price:'',
    });

    useEffect(()=>{
        cargar();
    },[0]); 

    async function cargar(){
        const response=await axios({
            method: 'get',
            url:'products/all',
            headers: { Authorization: `Bearer ${cookie.get('token')}` }
        });
        if(response.status === 200)setUserData(response.data);
    }; 

    async function Delete(id){
        const response=await axios({
            method: 'delete',
            url: `products/delete/${id}`,
            headers: { Authorization: `Bearer ${cookie.get('token')}` }
        });
        if(response.status === 200)
        setUserData(userData.filter(item=>item._id !== id));
    };

    function showForm(product){
        setProductData({id:product._id,name:product.name,description:product.description,price:product.price});
        setUpdateForm(true);
    };

    return(
        <div className="products">
            {
                (userData.length>0)?
                <div>
                {
                    (updateForm===true)?
                    <Edit setUpdateForm={setUpdateForm} productData={productData} cargar={cargar}/>:
                    <div className="product-list">{
                    userData.map((item,index) => {
                    return <div key={index} className="product-item">
                        <div className="align-button">
                        <button type="submit" onClick={()=>showForm(item)} className="option option-acces"><img src="/editing.png" className="icon-button"/></button>
                        <button type="submit" onClick={()=>Delete(item._id)} className="option option-acces"><img src="/trash.png" className="icon-button"/></button>
                        </div>
                        <p className="product-title">{item.name}</p>
                        <p>{item.description}</p>
                        <img src={"http://localhost:3000/"+item.url_image}  className="image-product"/>
                        <p className="product-price">${item.price}</p>
                        </div>
                    })}
                    </div>
                }
                </div>
                :<p>Sin publicaciones</p>
            }
        </div>
    );
};