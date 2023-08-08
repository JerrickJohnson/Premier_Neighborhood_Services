import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS, ADD_MESSAGE } from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { SEND_MESSAGE } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import { Modal, Button } from 'react-bootstrap';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [offerValue, setOfferValue] = useState('');
  const [showModal, setShowModal] = useState('');  // "", "offerSent", "notLoggedIn", "missingSeller"
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  const openModal = () => {
    setOfferValue(currentProduct.price);
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
      content: `I would like to buy your ${currentProduct.name} for $${offerValue}.`,
      sender: state.user.data._id,
      receiver: currentProduct.seller._id,
      product: currentProduct._id,
      timestamp: Date.now(),
      isOffer: true
    };

    if (!state.user) {
      setShowModal('notLoggedIn');
      return;
    }

    if (!currentProduct.seller || !currentProduct.seller._id) {
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

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  return (
    <>
      {currentProduct && cart ? (
        <div style={{
          backgroundColor: "#f4f4f4",
          borderRadius: "8px",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
          margin: "2rem auto",
          maxWidth: "600px",
          padding: "2rem",
        }}>
          <Link to="/marketplace">← Back to Marketplace</Link>

          <h2 style={{ color: "#333", marginBottom: "1rem" }}>{currentProduct.name}</h2>

          <p style={{ color: "#666", fontSize: "1rem", lineHeight: "1.6" }}>{currentProduct.description}</p>

          <p style={{ color: "#333", fontSize: "1.25rem", margin: "2rem 0" }}>
            <strong>Price:</strong>${currentProduct.price}
          </p>

          <img
            style={{ display: "block", maxWidth: "100%" }}
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}   
          />

          <Button 
            style={{ 
              display: 'block', 
              margin: '20px auto' 
            }} 
            onClick={openModal}
          >
            Make Offer
          </Button>

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
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={sendOffer}>
                Send Offer
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
