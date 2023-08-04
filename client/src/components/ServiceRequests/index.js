import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';



function Form(){

    const[name, setName] = useState('');
    // const[description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
    }

  return (
    <div>
        <div><h1>Service Request Form</h1>
        <h2>Please fill out the form below to submit a service request</h2>
        </div>     
         <div className='center'>
              <form onSubmit={handleSubmit}>
            <label mb-2>First Name:
                <input type="text" name="first name" placeholder='first name' onChange={(e) => setName(e.target.value)} />
            </label>
            <label>Last Name:
                <input type="text" name="last name" placeholder='last name' onChange={(e) => setName(e.target.value)} />
            </label>

            <label>Phone Number:
                <input type="text" name="phone number" placeholder='phone number' onChange={(e) => setName(e.target.value)} />
            </label>

            <label>Email:
                <input type="text" name="email" placeholder='email' onChange={(e) => setName(e.target.value)} />
            </label>

            <label>Address / Unit number:
                <input type="text" name="address" placeholder='address/unit number of apt' onChange={(e) => setName(e.target.value)} />
            </label>
            
            <label>Service Issue:
                <input type="text" name="service issue" placeholder='Please describe the issue' onChange={(e) => setName(e.target.value)} />
            </label>


           <button><Link to="/services">Submit Request</Link> </button>
        </form>
            </div>
        </div>
   
    );
}
    
export {Form};



