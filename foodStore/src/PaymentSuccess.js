import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const PaymentSuccess = () => {
 return (
    <div className="success-container">
        <FontAwesomeIcon icon={faCheckCircle} size="5x" color="#4caf50" />
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <a href="/" className="back-home">Back to Home</a>
    </div>
 );
};

export default PaymentSuccess;