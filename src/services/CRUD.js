import axios from "axios"

export async function postData(url, data , callback){
    try{
        const response = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json'
            }  
          })
        
        const {title, price, image} = response.data
        const result = {
            id: +new Date(),
            title: title ?? "product",
            price: price ?? 0,
            image: image ?? '/img/placeholder.webp'
        }

        callback(true, result)
    }catch(err){
        callback(false, err)
    }
}
export async function putData(url, data , callback){
    try{
        const response = await axios.put(url, data, {
            headers: {
              'Content-Type': 'application/json'
            }  
          })
        // const {title, price, image} = response.data
        // const result = {
        //     id: +new Date(),
        //     title: title ?? "product",
        //     price: price ?? 0,
        //     image: image ?? '/img/placeholder.webp'
        // }

        callback(true, response)
    }catch(err){
        callback(false, err)
    }
}

export async function deleteData(url, callback){
    try{
        const response = await axios.delete(url)
        const {id } = response.data
        const result = { id: id}

        callback(true, result)
    }catch(err){
        callback(false, err)
    }
}

export async function uploadImage(image, callback){
    try{
        const response = await axios.post(`https://httpbin.org/post`, {
            body: image
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // const {id } = response.data
        // const result = { id: id}

        callback(true, response)
    }catch(err){
        callback(false, err)
    }
}

export async function getData(limit = 5, callback){
    try{
        if(isNaN(limit)){
            throw new Error("Limit argument must a number")
        }else{
            const response = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`)
            callback(true, response)

        }

    }catch(err){
        callback(false, err)
    }
}