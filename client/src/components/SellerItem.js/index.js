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
        refetchQueries: [{ query: QUERY_SELLER_PRODUCTS, variables: { sellerId: userId } },],
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
    <div className="col-md-4 image-container">
    <Link to={`/products/${_id}`}>
        <img src={`/images/${image}`} className="card-img2" alt="" />
        </Link>
      </div>
      <div className="">
        <div className="card-body text-left">
          <li className="card-title mt-2">{name}</li>
          {/* <p className="card-text">{description}</p> */}
          <div className="list-group list-group-flush">
            <li className="mt-2">Price: ${price}</li>
          </div>
          <div className="mt-2">
          <a onClick={removeItem} href="#" className="btn btn-primary mr-2">Remove Item</a>
          <Link to="/message" className="btn btn-primary">Go To Messages</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
    );

}

export default SellerItem;
