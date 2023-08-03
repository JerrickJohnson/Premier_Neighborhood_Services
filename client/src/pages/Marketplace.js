import React from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Marketplace = () => {
  return (
    <div className="container">
      <Link to={`/AddItem`}>
      <button type="button" className="btn btn-primary btn-lg">Sell Item</button>
      </Link>
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Marketplace;
