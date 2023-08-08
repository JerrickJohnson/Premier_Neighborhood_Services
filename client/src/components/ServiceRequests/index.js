import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Form() {
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        setShowModal(true);
    }

    return (
        <div>
            <div className='center' 
                style={{backgroundImage: `url(https://gdocservices.com/wp-content/uploads/2020/03/AdobeStock_198744417-1024x683.jpeg)`, backgroundSize: "cover"}}>
                <form onSubmit={handleSubmit}>
                    <h1>Maintenance Request Form</h1>
                    <label>First Name: <br />
                        <input style={{ marginBottom: '20px' }} type="text" name="first name" placeholder='first name' width="150px" onChange={(e) => setName(e.target.value)} />
                    </label>
                    <br />
                    <label>Last Name: <br />
                        <input style={{ marginBottom: '20px' }} type="text" name="last name" placeholder='last name' onChange={(e) => setName(e.target.value)} />
                    </label>
                    <br />
                    <label> Phone Number: <br />
                        <input style={{ marginBottom: '20px' }} type="text" name="phone number" placeholder='phone number' onChange={(e) => setName(e.target.value)} />
                    </label>
                    <br />
                    <label>Email Address:  <br />
                        <input style={{ marginBottom: '20px', justifyContent: 'end' }} type="text" name="email" placeholder='email' onChange={(e) => setName(e.target.value)} />
                    </label>
                    <br />
                    <label>Address / Unit number: <br />
                        <input type="text" name="address" placeholder='address/unit number' onChange={(e) => setName(e.target.value)} />
                    </label>
                    <br />
                    <label><br />Maintenance Issue:
                        <input type="text" name="service issue" placeholder='Please describe the issue'
                            onChange={(e) => setName(e.target.value)} style={{ width: '100%', height: '200px' }} />
                    </label>
                    <br />
                    <br />
                    <button className="btn btn-primary" type="submit">Submit Service Request</button>
                </form>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                        <h2>Your request has been received!</h2>
                        <Link to="/services"><button>Okay</button></Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export { Form };