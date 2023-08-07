import React from "react";
// import Cart from "../components/Cart";
import AddProductForm from "../components/AddProductForm";
import { Link } from "react-router-dom";
import SellerList from "../components/SellerList";
// import { useQuery } from '@apollo/client';
// import { QUERY_USER } from '../utils/queries';

const AddItem = () => {
  // Fetch the user's data from the server
  // const { loading, data } = useQuery(QUERY_USER);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // // Get the user data from the query result
  // const user = data?.user;
  // const loggedInUserId = user?._id || '';

  return (

    <div className="container">
        <div>    
        <Link to="/marketplace">← Back to Marketplace</Link>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-12">
        <AddProductForm />
        </div> 
        
        <div className="col-lg-4 col-md-12">
        <SellerList />
        </div>
       </div>
    
    </div>
    
    
  );
    

};

export default AddItem;