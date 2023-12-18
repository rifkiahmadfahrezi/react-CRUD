import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";

const store = configureStore({
    reducer: {
        products: productReducer
    },
})

store.subscribe(() => {
    console.log("update state:", store.getState())
})

export default store;