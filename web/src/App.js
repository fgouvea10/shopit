import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import ProductDetails from "./components/Products/ProductDetails";

import "./styles/global.css";
import "rc-slider/assets/index.css";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
