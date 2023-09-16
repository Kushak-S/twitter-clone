import React, { useState } from 'react';
import logo from '../logo.svg';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle sign-in logic here, such as sending the data to a server for authentication.
    // Example: sendSigninDataToServer(formData);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow mt-5">
            <div className="card-body d-flex flex-column align-items-center">
            <img src={logo} alt="Logo" className="mb-3 img-fluid" style={{ width: '100px', height: '100px'}} />
              <h2 className="card-title text-center mb-4">Happening Now</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
              </form>
              <p className="mt-3 text-center">Don't have an account? <a href="/">Signup</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
