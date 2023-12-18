import React from "react";

export default function Link({href, className, onClick, children}){
    return(
        <>
            <a href={href} onClick={(e)=> onClick(e)} className={`${className} cursor-pointer`}>{children}</a>
        </>
    )
}