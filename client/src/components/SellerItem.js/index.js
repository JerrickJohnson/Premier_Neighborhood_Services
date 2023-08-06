import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";
import { useMutation } from '@apollo/client';
import { REMOVE_PRODUCT } from '../../utils/mutations';
import { QUERY_SELLER_PRODUCTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import './style.css';


function SellerItem(item) {

    const userProfile = Auth.getProfile();
    const userId = userProfile.data._id;

    const [state] = useStoreContext();
  
    const {
      image,
      name,
      _id,
      price,
    } = item;
  
    const [removeProduct] = useMutation(REMOVE_PRODUCT, {
        refetchQueries: [{ query: QUERY_SELLER_PRODUCTS, variables: { sellerId: userId } }],
      });
  
    const removeItem = async () => {
      try {
        await removeProduct({
          variables: { _id }
        });
      } catch (err) {
        console.error(err);
      }
    };
  


return (

    <div className="sellcard">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src={`/images/${image}`} className="card-img" alt="" />
      </div>
      <div className="col-md-8">
        <div className="card-body text-left">
          <h5 className="card-title">{name}</h5>
          {/* <p className="card-text">{description}</p> */}
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Price: ${price}</li>
          </ul>
          <div className="mt-2">
          <a onClick={removeItem} href="#" className="btn btn-primary mr-2">Remove Item</a>
            <a href="#" className="btn btn-primary">Go To Messages</a>
          </div>
        </div>
      </div>
    </div>
  </div>
    );

}

export default SellerItem;
