import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations'; // Your mutation query
import { Service } from '../../../../server/models';


function AddServiceRequest(props) {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    image: '',
    price: 0,
    category: '',
    seller: ''
  });
  const [addProductMutation] = useMutation(ADD_PRODUCT);// Add the mutation to the component

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the mutation action with the form data
      const { data } = await addProductMutation({
        variables: {
          name: formState.name,
          description: formState.description,
          image: formState.image,
          price: parseFloat(formState.price),
          quantity: parseInt(formState.quantity),
          category: formState.category,
          seller: formState.seller,
          // Add other fields as needed based on your mutation query
        },
      });
      console.log(data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };



  return (
    <div>
      <form onSubmit={handleFormSubmit}>
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
            {/* Render options based on your category data */}
            <option value="Household Supplies">Household Supplies</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="Services">Services</option>
            
            {/* Add other category options */}
          </select>
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="seller">Seller:</label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={formState.seller}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formState.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddServiceRequest;