import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './userform.css'
const UserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: '',
    batch: 'AM_6_to_7AM', // Default value
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // For age field, validate and set within the range
    if (name === 'age') {
      const ageValue = parseInt(value, 10);
      if (!isNaN(ageValue) && ageValue >= 16 && ageValue <= 68) {
        setFormData({ ...formData, [name]: ageValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          age: parseInt(formData.age, 10),
          batch: formData.batch,
          paymentmonth: 'January',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API response:', result);
       
        toast.success('Form submitted successfully!', { position: 'top-right' });
      } else {
        console.error('API request failed:', response.statusText);
       
        toast.error('Form submission failed. Please try again.', { position: 'top-right' });
      }
    } catch (error) {
      console.error('API request error:', error.message);

      toast.error('Form submission failed. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div style={{ borderWidth: '1px', borderStyle: 'solid', padding: '100px', margin: '300px', marginTop: '20px', borderRadius: '10px', borderColor: 'orange', marginBottom: '0px',
     boxShadow: "0 4px 8px 0 orange, 0 6px 20px 0 orange" }}>
      <form onSubmit={handleSubmit} style={{ alignItems: 'center' , color: 'white'}}>
      <label>
        Email:
        <input className='inputs' type="text" name="email" onChange={handleInputChange} />
      </label><br/><br/>
      <label>
        Name:
        <input className='inputs' type="text" name="name" onChange={handleInputChange} />
      </label><br/><br/>
      <label>
        Age:
        <input className='inputs' type="text" name="age" onChange={handleInputChange} />
        <br/>
        <h6>* age should be between 18-65</h6>
      </label><br/><br/>
      <label >
        Batch:
        <select  className='inputs' name="batch" onChange={handleInputChange} value={formData.batch}>
          <option value="AM_6_to_7AM">6-7 AM</option>
          <option value="AM_7_to_8AM">7-8 AM</option>
          <option value="AM_8_to_9AM">8-9 AM</option>
          <option value="PM_5_to_6PM">5-6 PM</option>
        </select>
      </label><br/><br/>
        <button className="buttonn" type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserForm;
