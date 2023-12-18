import React from "react";

export default function Card({children, className}){
    return (
       <div className={`bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg ${className}`}>
        {children}
       </div> 
    )
}

export function Body({children}){
    return(
        <div className="p-3">
            {children}
        </div>
    )
}

export function Image({src,alt,className}){
    return(
        <img src={src} alt={alt} className={`w-full h-[250px] object-contain ${className}`}/>
    )
}

export function Footer({children, className}){
    return (
        <>
            <footer className={className}>
                {children}
            </footer>
        </>
    )
}

Card.Body = Body
Card.Image = Image
Card.Footer = Footer

