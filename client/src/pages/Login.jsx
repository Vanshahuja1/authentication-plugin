import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import  { toast } from 'react-hot-toast';
import {useDispatch,useSelector } from 'react-redux'
import { SetUser } from '../redux/AuthSlice';
export default function Login() {
 const user=useSelector((state)=>state.Auth)
 console.log(user)
   const dispatch=useDispatch()
    const [email,setEmail]=useState('')
    const navigate=useNavigate()
    const [password,setPassword]=useState('')

       const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const request = await post('/api/auth/login', { email, password });
    const response = request.data;

    if (request.status === 200) {
      dispatch(SetUser(response.user));
      toast.success(response.message);

      // Redirect based on role
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else if (response.user.role === 'instructor') {
        navigate('/instructor');
      } else {
        navigate('/');
      }
    }
  } catch (error) {
    console.log(error);
    toast.error('Login failed');
  }
};

  return (
    <>

        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="" id="email" 
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor="passowrd">Password</label>
                    <input type="password" name=""
                      onChange={(e)=>setPassword(e.target.value)} id="password" />
                </div>
                <button type='submit'>Login</button>
                <p className='register-link'>
                Not registered? <Link to={'/register'}>Register here</Link>
                </p>
            </form>
        </div>




    </>
  )
}
