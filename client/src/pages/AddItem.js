import React from "react";
import Cart from "../components/Cart";
import AddProductForm from "../components/AddProductForm";
import { Link } from "react-router-dom";

const AddItem = () => {
  return (
    <div className="container">
        <Link to="/marketplace">← Back to Marketplace</Link>
        <AddProductForm />
      {/* <Cart /> */}
    </div>
  );
};

export default AddItem;