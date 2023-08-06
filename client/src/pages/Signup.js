import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { useStoreContext } from '../utils/GlobalState';
import { SET_USER } from '../utils/actions';

function Signup(props) {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    dob: '',
    phoneNumber: '',
    emergencyContact: '',
    emergencyContactPhoneNumber: ''
  });

  const [addUser] = useMutation(ADD_USER);
  const [, dispatch] = useStoreContext();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        ...formState,
      },
    });
    const token = mutationResponse.data.addUser.token;
    const user = mutationResponse.data.addUser.user;
    Auth.login(token);

    // Dispatch user details to global state
    dispatch({
      type: SET_USER,
      user: user
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Existing input fields */}
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>

        {/* New input fields */}
        <div className="flex-row space-between my-2">
          <label htmlFor="address">Address:</label>
          <input
            placeholder="123 Main St"
            name="address"
            type="text"
            id="address"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            placeholder="MM/DD/YYYY"
            name="dob"
            type="date"
            id="dob"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            placeholder="1234567890"
            name="phoneNumber"
            type="tel"
            id="phoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="emergencyContact">Emergency Contact:</label>
          <input
            placeholder="Emergency Contact"
            name="emergencyContact"
            type="text"
            id="emergencyContact"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="emergencyContactPhoneNumber">Emergency Contact Phone Number:</label>
          <input
            placeholder="1234567890"
            name="emergencyContactPhoneNumber"
            type="tel"
            id="emergencyContactPhoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;