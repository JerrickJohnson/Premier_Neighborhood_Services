import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PAYMENT, UPDATE_USER, GET_USER } from '../../utils/mutations';  
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStoreContext } from '../../utils/GlobalState';
import Auth from '../../utils/auth';  

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Payments = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [state, dispatch] = useStoreContext();
  const [createPayment] = useMutation(CREATE_PAYMENT);  
  const [updateUser] = useMutation(UPDATE_USER);  

  console.log("User ID:", Auth.getUserId());
  const { data: userData } = useQuery(GET_USER, {
    variables: { id: Auth.getUserId() },
  });

  const user = userData?.user || {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !Auth.loggedIn()) {
      // Not ready to submit or user is not logged in
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      return;
    }

    const amount = state.dues;  // Get dues from state

    try {
      await createPayment({
        variables: {
          user: user._id,
          amount: amount,
          paymentMethod: paymentMethod.id,
          paymentPurpose: "HOA fees"
        }
      });
      
      // If dues have been successfully paid, update user
      await updateUser({
        variables: {
          id: user._id,
          dues: 0,  // Dues are paid
        }
      });
    } catch (error) {
      console.log('[error]', error);
    }
  };

  return (
    <div className="payments">
      <h2>Payments</h2>
      <div>
        <p>Name: {user.firstName} {user.lastName}</p>
        <p>Address: {user.address}</p>
        <p>Amount Due: {user.dues}</p>
        {/* Add other fields as necessary */}
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || !Auth.loggedIn()}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default () => (
  <Elements stripe={stripePromise}>
    <Payments />
  </Elements>
);