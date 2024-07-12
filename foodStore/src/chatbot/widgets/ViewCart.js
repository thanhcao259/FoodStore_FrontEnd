import React from 'react'

export default function ViewCart() {

    const cartUrl = "http://localhost:3000/shopping-cart"; // URL cố định
  return (
    <div>
      <a href={cartUrl} target="_blank" rel="noopener noreferrer">
        <button className='view-cart-btn'>Xem giỏ hàng</button>
      </a>
    </div>
  )
}
