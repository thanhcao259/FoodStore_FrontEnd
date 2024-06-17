import React from 'react';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const PaymentFailed = () => {
    return (
        <div className="failed-container">
            <FontAwesomeIcon icon={faExclamationCircle} size="5x" color="#f44336" />
            <h2>Payment Failed</h2>
            <p>Sorry, there was a problem with your payment. Please try again.</p>
            <a href='/' className="back-to-store">Back to Store</a>
        </div>
    );
};

export default PaymentFailed;