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
         
         <div className='center' 
         style={{backgroundImage: `url(https://gdocservices.com/wp-content/uploads/2020/03/AdobeStock_198744417-1024x683.jpeg)`,backgroundSize: "cover"}}>
              <form onSubmit={handleSubmit}>
                
                <h1>Maintenance Request Form</h1>
            <label >First Name: <br></br>
                <input style={{marginBottom:'20px'}} type="text" name="first name" placeholder='first name' width="150px" onChange={(e) => setName(e.target.value)} />
            </label>

            <br></br>

            <label>Last Name: <br></br>
            <input style={{marginBottom:'20px'}} type="text" name="last name" placeholder='last name' onChange={(e) => setName(e.target.value)} />
            </label>

            <br></br>

            <label> Phone Number: <br></br>
            <input style={{marginBottom:'20px'}} type="text" name="phone number" placeholder='phone number' onChange={(e) => setName(e.target.value)} />
            </label>

            <br></br>

            <label>Email  Address:  <br></br>
            <input style={{marginBottom:'20px', justifyContent:'end'}} type="text" name="email" placeholder='email' onChange={(e) => setName(e.target.value)} />
            </label>

            <br></br>

            <label>Address / Unit number: <br></br>
                <input type="text" name="address" placeholder='address/unit number' onChange={(e) => setName(e.target.value)} />
            </label>

            <br></br>
        
            <label><br></br>Maintenance Issue:
                <input type="text" name="service issue" placeholder='Please describe the issue' 
                onChange={(e) => setName(e.target.value)}  style={{ width: '100%', height: '200px' }} />
            </label>

            <br></br>
            <br></br>
                       
                <button className="btn btn-primary">
                    <Link to="/services" className="text-decoration-none" style={{color: "white"}}>Submit Service Request</Link> 
                    </button>
                    
              
       </form>
            </div>
        </div>
   
    );
}
    
export {Form};



