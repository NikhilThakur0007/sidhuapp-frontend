import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ToastContainer } from "react-toastify";
import Addproduct from "./products/Addproduct";
import Products from "./products/Products";
import Updateproduct from "./products/Updateproduct";

export default function Index() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<h1>Hey i am Home Page</h1>} />
        <Route path="/products" element={<Products />} />
        <Route path="/addproducts" element={<Addproduct />} />
        <Route path="/updateproducts/:id" element={<Updateproduct />} />
      </Routes>
      <Footer />
    </>
  );
}
