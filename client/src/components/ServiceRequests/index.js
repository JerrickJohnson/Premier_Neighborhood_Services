import React from 'react';
import { useState } from 'react';



function Form(){

    const[name, setName] = useState('');
    const[description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, description);
    }

  return (
    <div>     
        <h1>Service Request Form</h1>
        <form onSubmit={handleSubmit}>
            <label>Name:
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
            </label>
            <label>Description:
                <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}
    
export {Form};



