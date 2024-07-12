import React from 'react'



export default function LoginBtn() {
    
  const loginUrl = "http://localhost:3000/login"; // URL cố định
  const registerUrl = "http://localhost:3000/register"; // URL cố định
  return (
    <div>
      <a href={loginUrl} target="_blank" rel="noopener noreferrer">
        <button className='login-btn'>Đăng nhập</button>
      </a>
      <a href={registerUrl} target="_blank" rel="noopener noreferrer">
        <button className='register-btn'>Đăng ký</button>
      </a>
    </div>
  )
}
