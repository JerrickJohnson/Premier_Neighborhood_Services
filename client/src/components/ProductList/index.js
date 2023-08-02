import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import AddProductForm from '../AddProductForm'; // Import the AddProductForm component
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations'; // Your mutation query


function ProductList() {
  const [state, dispatch] = useStoreContext();

  const [showAddForm, setShowAddForm] = useState(false); // create state

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // Define the mutation action using useMutation hook
  const [addProductMutation] = useMutation(ADD_PRODUCT);// Add the mutation to the component

  const addProduct = async (formData) => {
    try {
      // Call the mutation action with the form data
      const { data } = await addProductMutation({
        variables: {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          category: formData.category,
          seller: formData.seller,
          // Add other fields as needed based on your mutation query
        },
      });

      // Update the global state with the newly added product data
      dispatch({
        type: ADD_PRODUCT,
        product: data.addProduct, // Assuming the response has the newly added product data
      });

      // Hide the "Add Product" form after successful submission
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
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

  const handleAddButtonClick = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {/* Toggle the display of the form based on showAddForm */}
      {showAddForm ? (
        <AddProductForm setShowAddForm={setShowAddForm} addProduct={addProduct} />
      ) : (
        <button onClick={handleAddButtonClick}>Sell Item</button>
      )}
      {/* Render the list of products */}
      {state.products.length ? (
        <div>
          {filterProducts().map((product) => (
            <ProductItem
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
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );


}


export default ProductList;
