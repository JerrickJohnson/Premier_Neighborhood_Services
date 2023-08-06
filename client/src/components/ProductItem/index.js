import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MESSAGE } from "../../utils/actions";
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';  
import './style.css';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [offerValue, setOfferValue] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE);
  console.log("Global State:", state);
  const {
    image,
    name,
    description,
    _id,
    price,
    quantity,
    seller
  } = item;

  const openModal = () => {
    setOfferValue(price);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOfferChange = (event) => {
    setOfferValue(event.target.value);
  };

  const sendOffer = async () => {
    console.log('Detailed User Object:', state.user);
    // Construct the offerMessage first
    const offerMessage = {
      content: `I would like to buy your ${name} - ${description} for $${offerValue}.`,
      sender: state.user.data._id,
      receiver: seller._id,
      product: _id, // This is the product ID
      timestamp: Date.now(),
      isOffer: true
    };

    // Log the state user and offerMessage for troubleshooting
    console.log('State User:', state.user);
    console.log('Offer Message:', offerMessage);

    if (!state.user) {
      alert('You must be logged in to make an offer.');
      return;
    }

    if (!seller || !seller._id) {
      alert('Seller information is missing. Cannot send offer.');
      return;
    }

    try {
      const { data } = await sendMessage({
        variables: {
          sender: offerMessage.sender,  
          receiver: offerMessage.receiver,
          product: offerMessage.product,  
          messageText: offerMessage.content
        }
      });

      // Assuming the sendMessage mutation returns the saved message
      const savedMessage = data.sendMessage;

      // Dispatch the ADD_MESSAGE action to update the global state
      dispatch({
        type: ADD_MESSAGE,
        message: savedMessage
      });

      // Close modal and reset the offer value after sending
      setModalOpen(false);
      setOfferValue('');

      alert('Your offer has been sent to the seller.');

    } catch (error) {
      console.error('Error sending offer:', error);
    }
};

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={openModal}>Make Offer</button>
      {isModalOpen && (
        <div className="offer-modal">
          <h4>Enter Your Offer</h4>
          <input 
            type="number" 
            value={offerValue} 
            onChange={handleOfferChange} 
          />
          <button onClick={sendOffer}>Send Offer</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ProductItem;