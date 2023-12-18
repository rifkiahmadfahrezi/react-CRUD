import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LOCAL_STORAGE_KEY = "new-product"

// async function setInitialState(from){
//     const response = await axios.get(`https://fakestoreapi.com/products?limit=5`)
//     switch (from) {
//         case 'API' :
//             localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data))
//             return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
//         break;
//         case 'LOCALSTORAGE':
//             return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
//         break;
//         default: 
//             const data = [] 
//             const result = data.concat(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)), response.data)
//             const filter = result.filter(i => i !== null)
//             if (localStorage.getItem(LOCAL_STORAGE_KEY) === null){
//                 localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filter))
//             }
//             // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filter))
//             return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []    
//        break;
//     }
// }


function seteInitialState(){
    const data = []
    if(localStorage.getItem(LOCAL_STORAGE_KEY) === null){
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]))
    }else{
        data.push(...JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))
    }
    return data
}


const initialState = {
    items: seteInitialState()
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addNewProduct: (state, action) => {
            state.items.push(action.payload)
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items))
        },
        deleteProduct: (state, action) => {
            if(window.confirm("delete this product")){
                const notDeletedProduct = state.items.filter(item => item.id !== action.payload)
                state.items = notDeletedProduct
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items))
            }else{
                window.alert("Delete product canceled!")
            }

        },  
        updateProduct: (state, action) => {
            const notUpdatedProduct = state.items.filter(item => item.id !== action.payload.id)
            state.items = [action.payload, ...notUpdatedProduct]
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items))
        }
    }
})


export const { addNewProduct, deleteProduct, updateProduct } = productSlice.actions
export default productSlice.reducer