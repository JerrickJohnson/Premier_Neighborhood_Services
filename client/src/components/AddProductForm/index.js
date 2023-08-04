import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations'; // Your mutation query
import { QUERY_CATEGORIES } from '../../utils/queries';


function AddProductForm({ loggedInUserId }) {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    image: '',
    price: 0,
    quantity: 0,
    category: '',
    // seller: loggedInUserId // Set the seller using the prop
  });

  const [addProductMutation] = useMutation(ADD_PRODUCT);// Add the mutation to the component

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //submit form values in HTML using the name attribute
    document.theForm.submit();

    //reset the form values
    setFormState({
      name: '',
      description: '',
      image: '',
      price: 0,
      quantity: 0,
      category: '',
      // seller: loggedInUserId // Reset seller to the logged-in user
    })
  };


  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  if (loading || !categoryData) {
    return <p>Loading categories...</p>;
  }

  return (
    <div>
      {/* prevent redirecting to a new page on submit */}
      <iframe name="dummyframe" id="dummyframe" style={{display: 'none'}}></iframe>
      <form action="/api/add-product" name="theForm" method="post" encType='multipart/form-data' target="dummyframe">
      {/* <form onSubmit={handleFormSubmit} encType='multipart/form-data'> */}
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="description">Product Description:</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="price">Price:</label>
          <input
            type="number" 
            id="price"
            name="price"
            value={formState.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formState.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="category">Category:</label>
          <select
             id="category"
            name="category"
            value={formState.category}
            onChange={handleChange}
            required
        >
          <option value="">Select a category</option>
          {categoryData.categories.map(category => (
          <option key={category._id} value={category._id}>
          {category.name}
          </option>
         ))}
          </select>
        </div>
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="seller">Seller:</label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={formState.seller}
            readOnly // This will make the input field read-only
          />
        </div> */}
        <div className="flex-row space-between my-2">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            value={formState.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit" onClick={handleFormSubmit}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;