import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <h2>Login Page</h2>
            <form>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email:</strong></label>
                    <input type='email' name='email' autoComplete='off' placeholder='Enter email'
                     className='form-control rounded-0'></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password:</strong></label>
                    <input type='password' name='password' placeholder='Enter password'
                     className='form-control rounded-0'></input>
                </div>
                <button className='btn-btn sucess w-100 rounded-0'>Log in</button>
            </form>
        </div>
    </div>
  )
}

export default Login