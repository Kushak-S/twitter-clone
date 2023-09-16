import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface PostProps {
  profilePic: any;
  username: string;
  displayName: string;
  content: string;
  timestamp: string;
}

const Post: React.FC<PostProps> = ({profilePic, username, displayName, content, timestamp }) => {
  return (
    <div className="container">
        <div className="card">
        <div className="card-body d-flex flex-column m-4">
        <div className="row justify-content-left" >
            <div className="col-sd">
                <img
                    src={profilePic}
                    alt="Profile"
                    className="rounded-circle img-fluid"
                    style={{ width: '3rem', height: '3rem'}}
                />
            </div>
            <div className="col-sd ml-2">
                <h5 className='mb-0'>{displayName}</h5>
                <a href='/profile'>@{username}</a>
            </div>
        </div>
        <div className="row justify-content-left mt-4">
        <p>{content}</p>
        </div>
        <div className="row justify-content-left">
        <div>{timestamp}</div>
        </div>
        </div>
        </div>
    </div>
  );
};

export default Post;
