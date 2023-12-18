import React from 'react'

import UpdateFormTemplate from '../templates/updateFormTemplate'

export default function UpdateProduct(){
        return(
            <>  
                <div className="container mx-auto px-3 my-7 flex items-center justify-between">
                    <h1 className="text-lg font-bold capitalize text-blue-800">Update product</h1>
                    <button 
                        onClick={()=> window.location.href = window.location.origin}
                        type="button" 
                        className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-500 text-white">Back to home</button>
                </div>
                <UpdateFormTemplate />
            </>
        )
}
