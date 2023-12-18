import React from "react";

export default function Input({defaultValue, required = false,id ,name,type = "text", placeholder, onChange, className}){
    return(
        <>
            <input 
                defaultValue={defaultValue}
                required={required}
                name={name}
                id={id}
                type={type} 
                placeholder={placeholder} 
                onChange={(e) => onChange(e)} 
                className={`py-2 px-4 rounded-md font-sans ${className}`}/>
        </>
    )
}