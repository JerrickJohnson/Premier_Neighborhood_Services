import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations'; // Your mutation query
import { QUERY_CATEGORIES } from '../../utils/queries';
import Auth from '../../utils/auth';
import './style.css';


function AddProductForm() {

  const userProfile = Auth.getProfile();

  const userId = userProfile.data._id;

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    image: '',
    price: 0,
    quantity: 0,
    category: '',
    seller: userId // Set the seller using the prop
  });
  console.log(userId)
  const [addProductMutation] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: QUERY_CATEGORIES }],
  });
  // Add the mutation to the component

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Move the userProfile and userId initialization here
    const userProfile = Auth.getProfile();
    const userId = userProfile.data._id;
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
          seller: userId, // Include the seller ID in the mutation variables
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
        seller: userId, // keep the seller ID in the form state
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
  
  if (loading || !categoryData) {
    return <p>Loading categories...</p>;
  }


  return (
    <div  >
      {/* prevent redirecting to a new page on submit */}
      {/* <iframe name="dummyframe" id="dummyframe" style={{display: 'none'}}></iframe> */}
      <form className="form-style-9" action="/api/add-product" name="theForm" method="post" encType='multipart/form-data' target="dummyframe">
      {/* <form onSubmit={handleFormSubmit} encType='multipart/form-data'> */}
        <div className="flex-row space-between my-2 ">      
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
            type="text"
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