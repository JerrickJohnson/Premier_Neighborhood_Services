import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import './style.css';


function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    description,
    _id,
    price,
    quantity,
    seller
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Make Offer</button>
    </div>
  );

//   return (
//     <div className="card mb-3" style={{width: '80%', marginBottom: '20px', border: '1px solid #ccc', padding: '10px'}}>
//   <div className="row g-0">
//     <div className="col-md-4">
//     <Link to={`/products/${_id}`}>
//       <img src={`/images/${image}`} className="img-fluid rounded-start" alt={name}></img>
//       </Link>
//     </div>
//     <div className="col-md-8">
//       <div className="card-body">
//         <h5 className="card-title">{name}</h5>
//         <p className="card-text">{description}</p>
//         <p className="card-text">{seller}</p>
//         {/* <p className="card-text">{quantity} {pluralize("item", quantity)} available</p> */}
//         <p className="card-text"><small className="text-body-secondary">${price}</small></p>
//         <button onClick={addToCart}>Buy Item</button>
//       </div>
//     </div>
//   </div>
// </div>
//   );
    

}

export default ProductItem;
