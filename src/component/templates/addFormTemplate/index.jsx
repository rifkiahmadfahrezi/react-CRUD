import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Input from "@/UI/elements/input";
import Card from "@/UI/fragments/card";

import {addNewProduct} from "@/redux/slices/productSlice";
import { postData } from "@/services/CRUD";

export default function AddFormTemplate({action, className, onSubmit}){
    const dispatch = useDispatch()
    const [ formValue, setFormValue ] = useState({
        id: null,
        title: null,
        price: null,
        image: null,
    })
    const previewImgSrc = useRef()
    const [ message, setMesssage ] = useState(null)

    
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
        postData(`https://fakestoreapi.com/products`, formValue, (status, response) => {
            if(status){
                dispatch(addNewProduct(response))
                form.reset()
                resetFormState()
                setMesssage("New Product added succesfully!")
            }else{
                console.error(response)
                setMesssage("Failed to add new product!")
            }
        })
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


        setFormValue({ 
            ...formValue,
            [name]: file    
        })
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
                        onClick={() => setMesssage(null)}>{message}</p>
                    }
                        
                    <form onSubmit={(e) => formSubmitHandler(e)} >
                        <div className="flex flex-col mb-3">
                            <label 
                                htmlFor="title" 
                                className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 capitalize">title:</label>
                            <Input
                                required
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

                                <img  
                                    ref={previewImgSrc}
                                    width={100} height={100} 
                                    className={`object-contain mt-2 ${formValue.image === null && 'opacity-0 pointer-events-none absolute'}`}/>

                                

                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-500 text-white mt-9"
                            >add product</button>
                    </form> 
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}