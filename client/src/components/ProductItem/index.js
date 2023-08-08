import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MESSAGE } from "../../utils/actions";
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';
import { Modal, Button } from 'react-bootstrap';
import './style.css';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [offerValue, setOfferValue] = useState('');
  const [showModal, setShowModal] = useState('');  // "", "offerSent", "notLoggedIn", "missingSeller"
  const [sendMessage] = useMutation(SEND_MESSAGE);

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
    const offerMessage = {
      content: `I would like to buy your ${name} - ${description} for $${offerValue}.`,
      sender: state.user.data._id,
      receiver: seller._id,
      product: _id,
      timestamp: Date.now(),
      isOffer: true
    };

    if (!state.user) {
      setShowModal('notLoggedIn');
      return;
    }

    if (!seller || !seller._id) {
      setShowModal('missingSeller');
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

      const savedMessage = data.sendMessage;
      dispatch({
        type: ADD_MESSAGE,
        message: savedMessage
      });

      setModalOpen(false);
      setOfferValue('');
      setShowModal('offerSent');

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
        {/* <div>{quantity} {pluralize("item", quantity)} in stock</div> */}
        <span>${price}</span>
      </div>
      <Button onClick={openModal}>Make Offer</Button>

      <Modal show={showModal === "offerSent"} onHide={() => setShowModal('')}>
        <Modal.Header closeButton>
          <Modal.Title>Offer Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your offer has been sent to the seller!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal('')}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal === "notLoggedIn"} onHide={() => setShowModal('')}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must be logged in to make an offer.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal('')}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal === "missingSeller"} onHide={() => setShowModal('')}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Seller information is missing. Cannot send offer.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal('')}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input 
            type="number" 
            value={offerValue} 
            onChange={handleOfferChange} 
            className="form-control" 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={sendOffer}>Send Offer</Button>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductItem;