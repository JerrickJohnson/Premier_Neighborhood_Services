import React, { useEffect } from 'react';
import SellerItem from '../SellerItem.js';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_SELLER_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
// import { useParams } from 'react-router-dom';
import Auth from '../../utils/auth';


function SellerList() {
  
    const user = Auth.getProfile().data._id;

  const [state, dispatch] = useStoreContext();


  const { currentCategory } = state;

//   const { sellerId } = useParams();

  const { loading, data } = useQuery(QUERY_SELLER_PRODUCTS, {
    variables: { sellerId: user }
  });
  console.log(user);
  

  useEffect(() => {
    if (data && data.sellerProducts) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.sellerProducts,
      });
      data.sellerProducts.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }


  return (
    <div className="my-2">
      <h2>My Items:</h2>
      {/* Render the list of products */}
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <SellerItem
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              category={product.category}
              seller={product.seller}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any Items yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );


}


export default SellerList;
