import React, { useState } from 'react';

const AddProductForm = ({ showAddForm, setShowAddForm, addProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '', 
    price: 0,
    quantity: 0,
    category: '',
    seller: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the addProduct function from the parent component (ProductList)
    addProduct(formData);
    // Reset the form data after submission
    setFormData({
        name: '',
        description: '',
        image: '', 
        price: 0,
        quantity: 0,
        category: '',
        seller: ''
    });
    // Hide the "Add Product" form after submission
    setShowAddForm(false);
  };

  if (!showAddForm) {
    return null; // If showAddForm is false, do not render the form
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Product Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {/* Render options based on your category data */}
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            {/* Add other category options */}
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;