import React from 'react';
import AppBar from './Appbar';

const Profile = () => {
  return (
    <>
      <AppBar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="profile-img">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="rounded-circle img-fluid"
              />
            </div>
          </div>
          <div className="col-md-9">
            <div className="profile-header">
              <h1>John Doe</h1>
              <p>@johndoe</p>
              <button className="btn btn-secondary">Edit Profile</button>

            </div>
            <div className="profile-bio">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vehicula vestibulum odio, nec consectetur quam laoreet sit amet.
                Nullam rhoncus libero non massa placerat, ut condimentum nulla
                condimentum.
              </p>
            </div>
            <div className="profile-stats">
              <div className="row">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">Active</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
