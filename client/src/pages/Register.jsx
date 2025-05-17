import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role user
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/api/auth/register', {
        name,
        email,
        password,
        role, // send role (user or instructor)
      });
      const response = request.data;

      if (request.status === 200) {
        toast.success(response.message);
        navigate('/login');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='input-group'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='input-group'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='input-group'>
          <label htmlFor="role">Select Role</label>
          <select id="role" onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="user">User</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        <button type='submit'>Register</button>

        <p className='register-link'>
          Already have an account? <Link to='/login'>Login here</Link>
        </p>
      </form>
    </div>
  );
}
