import React from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

const Marketplace = () => {
  return (
    <div className="container">
    <Link to={`/AddItem`} className="post-item-button">  {/* <-- apply the CSS class to your Link */}
    <button  type="button" className="btn btn-primary btn-lg">Post Item</button>
    </Link>
    <CategoryMenu />
    <ProductList />
  </div>
  );
};

export default Marketplace;
