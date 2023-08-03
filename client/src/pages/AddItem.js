import React from "react";
// import Cart from "../components/Cart";
import AddProductForm from "../components/AddProductForm";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const AddItem = () => {
  // Fetch the user's data from the server
  const { loading, data } = useQuery(QUERY_USER);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Get the user data from the query result
  const user = data?.user;
  const loggedInUserId = user?._id || '';

  return (
    <div className="container">
        <Link to="/marketplace">← Back to Marketplace</Link>
        <AddProductForm loggedInUserId={loggedInUserId} />
      {/* <Cart /> */}
    </div>
  );
};

export default AddItem;