import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

import Navbar from './component/templates/navbar';
import ProductsContainer from './component/templates/productsContainer';
import AddProduct from './component/pages/AddProduct';
import UpdateProduct from './component/pages/UpdateProduct';
import {loader as ProductLoader} from '@/component/templates/updateFormTemplate'

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
              <Navbar />
              <Outlet />
            </>,
    children: [
      {
        path: "/",
        element: <>
                  <ProductsContainer />
                  <Outlet />
                </>
      },
      {
        path: "/add-product",
        element: <>
                  <AddProduct/>
                  <Outlet />
                </>,
      },
      {
        path: "/update-product/:productID",
        element: <>
                  <UpdateProduct/>
                  <Outlet />
                </>,
        loader: ProductLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);