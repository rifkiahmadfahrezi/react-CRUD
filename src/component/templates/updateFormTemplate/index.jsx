import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";

import Input from "@/UI/elements/input";
import Card from "@/UI/fragments/card";

import { updateProduct } from "@/redux/slices/productSlice";
import { putData, uploadImage } from "@/services/CRUD";
import { useGetProduct } from "@/hooks/useGetProduct";

export default function UpdateFormTemplate(){
    const productID = useParams().productID
    const product = useGetProduct(productID)
    const [ uploadLoading, setUploadLoading ] = useState(false)

    const dispatch = useDispatch()

    // form initial value
    const [ formValue, setFormValue ] = useState({
        id: null,
        title: null ,
        price: null ,
        image: null ,
    })

    useEffect(() => {
       product.forEach(p => {
            setFormValue({
                id: p.id,
                title: p.title,
                price: p.price,
                image: p.image,
            })
       })
    }, [product])

    
    const previewImgSrc = useRef()
    const [ message, setMessage ] = useState(null)
    
    
    function resetFormState(){
        setFormValue({
            id: null,
            title: null,
            price: null,
            image: null,
        })
    }

    function formSubmitHandler(e){
        e.preventDefault()
        const form =  e.target

        // if image upload on loading
        if(uploadLoading) return

        // if updated product is not from the API
        if(productID > 20){
            dispatch(updateProduct(formValue))
            setMessage("Product updated succesfully!")
        }else{
            putData(`https://fakestoreapi.com/products/${productID}`, formValue, (status, response) => {
                if(status){
                    setMessage("Product updated succesfully!")
                    dispatch(updateProduct(response.data))
                }else{
                    setMessage("Failed to update product!")
                    console.error(response)
                }
            })
        }

    }

    function inputChangeHandler(e){
        const name = e.target.name
        const value = e.target.value

        setFormValue({ 
            ...formValue,
            [name]: value
        })
    }
    function inputFileHandler(e){
        const name = e.target.name
        const file = URL.createObjectURL(e.target.files[0])

        previewImgSrc.current.src = file   
        setUploadLoading(true)

        // for animation
        setTimeout(() => {
            setFormValue({ 
                ...formValue,
                [name]: file
            })
            setUploadLoading(false)
        }, 1000)

        // //uncomment code down here will upload image via API and return base64
        // // (too large to save it in the localStorage)
        // uploadImage(e.target.files[0], (status, response) => {
        //     if(status){
        //         setFormValue({ 
        //             ...formValue,
        //             [name]: response.data.files.body    
        //         })
        //         setUploadLoading(false)
        //     }else{
        //         console.error(response)
        //     }
        // })

        
    }

    return(
        <>
            <div className="container px-3 mx-auto mt-9">
                <Card>
                    <Card.Body>

                    {message !== null  && 
                        <p 
                        title="click to remove this mesage"
                        className="text-center my-5 font-semibold cursor-pointer" 
                        onClick={() => setMessage(null)}>{message}</p>
                    }
                        
                    <form onSubmit={(e) => formSubmitHandler(e)} >
                    
                    {product?.length > 0 ? 
                        product.map(item => {
                            return (
                                <div key={item.id}>
                                <div className="flex flex-col mb-3">
                                    <label 
                                        htmlFor="title" 
                                        className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 capitalize">title:</label>
                                    <Input
                                        required  
                                        defaultValue={item.title}
                                        onChange={inputChangeHandler} 
                                        className="bg-slate-100 mt-2" 
                                        name="title" 
                                        type="text" 
                                        placeholder="Title...."/>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label 
                                        htmlFor="price" 
                                        className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 capitalize">price:</label>
                                    <Input
                                        required
                                        defaultValue={item.price}
                                        onChange={inputChangeHandler} 
                                        className="bg-slate-100 mt-2" 
                                        name="price" 
                                        type="number" 
                                        placeholder="Price...."/>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="image" className="block text-sm font-medium text-slate-700 capitalize">Image:</label>
                                    <input
                                    
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={(e) => inputFileHandler(e)} 
                                    className="bg-slate-100 mt-2" 
                                    name="image" 
                                    type="file" 
                                    placeholder="Select file...."/>

                                        <div className="flex gap-5 relative">
                                            <img  
                                                ref={previewImgSrc}
                                                src={item.image}
                                                width={100} height={100} 
                                                className={`object-contain mt-2 ${uploadLoading && 'animate-pulse'} ${item.image === null && 'opacity-0 pointer-events-none absolute'}`}/>

                                            {uploadLoading && 
                                            <div className="absolute pointer-events-none">
                                                <img width={100} height={100}  src="/img/loading-spinner.gif" className="object-contain" alt="" />  
                                                <p className="text-center p-1 rounded-sm bg-white">Uploading...</p>
                                            </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : null
                     }
                        

                        <button
                            disabled={uploadLoading}
                            type="submit"
                            className={`${uploadLoading ? 'cursor-not-allowed bg-gray-500' : 'hover:bg-blue-500 bg-blue-600'} py-2 px-4 rounded-md  text-white mt-9`}
                            >update product</button>
                    </form> 
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export async function loader(id){
    const productID = id.params.productID
    return {productID}
}