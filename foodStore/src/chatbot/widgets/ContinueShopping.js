import React from 'react'

export default function ContinueShopping(props) {

    const handleContinueShopping = () => {
        props.actionProvider.handleContinueShopping();
    }

    const handleStopShopping = () => {
        props.actionProvider.handleStopShopping();
    }
  return (
    <div>
        <button className='order-btn add' onClick={() => handleContinueShopping()}>Có</button>
        <button className='order-btn'onClick={() => handleStopShopping()}>Không</button>
    </div>
  )
}
