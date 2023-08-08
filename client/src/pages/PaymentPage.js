import React from 'react';
import Payments from '../components/Payments';

const PaymentPage = () => {
  return (
    <div className="d-flex justify-content-center vh-90" style={{ marginTop: '10%' }}>
      <div className="card" style={{ maxWidth: '80%', minWidth: '60%' }}>
        <div className="card-header">
          <h1 className="text-center">Pay your HOA Fee</h1>
        </div>
        <div className="card-body">
          <Payments />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;