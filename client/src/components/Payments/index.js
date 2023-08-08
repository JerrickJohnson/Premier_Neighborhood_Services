import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CHECKOUT_SESSION, QUERY_USER_PAYMENT_INFO } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useStoreContext } from '../../utils/GlobalState';
import Auth from '../../utils/auth';  

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Payments = () => {
  const [state, dispatch] = useStoreContext();
  const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);  

  const { data: userData } = useQuery(QUERY_USER_PAYMENT_INFO, {
    variables: { id: Auth.getUserId() },
  });

  const user = userData?.user || {};

  const handleCheckout = async () => {
    if (!Auth.loggedIn()) {
      return;
    }
  
    const { data } = await createCheckoutSession();
    const stripe = await stripePromise;
  
    const { error } = await stripe.redirectToCheckout({
      sessionId: data.checkout.session, // Use the correct data structure based on the returned data
    });
  
    if (error) {
      console.log('[error]', error);
    }
  };

  return (
    <div className="payments">
      <h2><strong>Payments</strong></h2>
      <div>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Due Date:</strong> 09/01/2023</p>
        <p><strong>Amount Due:</strong> $500.00</p>
      </div>
      <button onClick={handleCheckout} disabled={!Auth.loggedIn()}>
        Pay with Stripe Checkout
      </button>
    </div>
  );
};

export default Payments;