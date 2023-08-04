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
    seller: loggedInUserId // Set the seller using the prop
  });

  const [addProductMutation] = useMutation(ADD_PRODUCT);// Add the mutation to the component

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

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
          seller: formState.seller, // Use the seller from formState
          // Add other fields as needed based on your mutation query
        },
      });
      console.log(data);
      // Reset form data after successful submission
      setFormState({
        name: '',
        description: '',
        image: '',
        price: 0,
        quantity: 0,
        category: '',
        seller: loggedInUserId // Reset seller to the logged-in user
      });
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
          {categoryData.categories.map(category => (
          <option key={category._id} value={category._id}>
          {category.name}
          </option>
         ))}
          </select>
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="seller">Seller:</label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={formState.seller}
            readOnly // This will make the input field read-only
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

export default AddProductForm;