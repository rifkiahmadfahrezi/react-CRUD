import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export function useGetProduct(id){
        const products = useSelector(state => state.products.items)
        const [ product, setProduct ] = useState([])

        useEffect(() => {
            try {
                if(isNaN(id)){
                    throw new Error('useGetProduct must provide an id (number)')
                }else{
                    const filteredProduct = products.filter(item => item.id === Number(id))
                    setProduct(filteredProduct)
                }
            } catch (error) {
                console.error(error)
            }
        }, [id])

        return product
}