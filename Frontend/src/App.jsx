import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NavBar from "./components/NavBar.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore.js";
import Loading from "./components/Loading.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import { useCartStore } from "./stores/useCartStore.js";

const App = () => {
  const { user,checkauth ,checkingAuth } = useUserStore();
  const{cart,getCartItem} = useCartStore()
  useEffect(()=>{
    checkauth()
  },[checkauth])
  useEffect(()=>{
   if(user) getCartItem()
  },[getCartItem,user])
  
  if(checkingAuth){
    return <Loading/>
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,50,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"}/>} />
          <Route path="/login" element={!user ? <LoginPage/> : <Navigate to={"/"}/>} />
          <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage/> : <Navigate to={"/login"}/>} />
          <Route path="/category/:category" element={<CategoryPage/>}/>
          <Route path="/cart" element={user ? <CartPage/> : <Navigate to={"/login"}/>}/>
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
