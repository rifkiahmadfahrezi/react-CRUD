import React, { useEffect, useRef, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

import Card from "@/UI/fragments/card";
import Link from "@/UI/elements/link";
// import CardSkeleton from "@/UI/fragments/skeletons/CardSkeleton";
import { addNewProduct, deleteProduct } from "@/redux/slices/productSlice";
import { deleteData, getData } from "@/services/CRUD";


export default function ProductsContainer(){
     const data = useSelector(state => state.products.items)
     const dispatch = useDispatch()

    function deleteClickHandler(id){
        // id > 20 means that product is not from the API
        if(id > 20){
            dispatch(deleteProduct(id))
        }else{
            deleteData(`https://fakestoreapi.com/products/${id}`, (status, response) => {
                if(status){
                    dispatch(deleteProduct(id))
                }else{
                    console.error(response)
                }
            })
        }
        
    }

    function clearLocalStorage(){
        if(confirm('delete localstorage?')){
            localStorage.removeItem('new-product')
            alert('localstorage removed!')
            location.reload()
        }
    }

    function getDataFromAPI(){
        getData(5, (status, response) => {
            if(status){
                const data = response.data
                data.forEach(productItem => {
                    dispatch(addNewProduct(productItem))
                })
            }else{
                console.error(response)
            }
        })
    }

    return (
        <>
            <main className="mt-10">
                <div className="container px-2 mx-auto">
                   <div className="flex items-center justify-between">
                        <Link 
                            href="/add-product" 
                            className="bg-blue-600 py-2 px-4 rounded-md text-white hover:bg-blue-500"
                            >Add product</Link>

                        {data?.length <= 0 && 
                            <button 
                                type="button"
                                onClick={()=> getDataFromAPI()}
                                className="bg-yellow-600 py-2 px-4 rounded-md text-white hover:bg-yellow-500"
                                >get data from API</button>
                        }
                   </div>
                   <section className={`grid ${data?.length > 3 ? 'grid-cols-auto-fit' : 'grid-cols-2 md:grid-cols-3'} gap-5 mt-5`}>
                   {data?.length > 0
                   ? data.map(item => {
                        return(
                            <Card key={item.id}>
                                <Card.Image src={item.image}/>
                                <Card.Body>
                                    <h1 className="font-semibold text-blue-600">{item.title}</h1>
                                    <h3>${item.price}</h3>
                                </Card.Body>
                                <Card.Footer className="flex items-center justify-evenly my-2">
                                    <Link 
                                        href={`update-product/${item.id}`}
                                        className="bg-green-500 text-white py-2 px-4 rounded-md">Update</Link>
                                    <button
                                        type="button"
                                        onClick={() => deleteClickHandler(item.id)} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
                                </Card.Footer>
                            </Card> 
                        )
                    }).reverse()  
                   : <p className="text-center col-span-3">There is no products to display</p>
                   }
                   </section>
                </div>
            </main>
        </>
    )
}