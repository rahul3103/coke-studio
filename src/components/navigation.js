import React from 'react';


const Navigation = ({next, previous}) => {
  

  return (
    <li className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <a href="#" onClick={(e) => previous(e)} className="previous round">&#8249;Prev</a>
        </div>
        <div className="media-body">
          <div className="media-heading">
            <a href="#" onClick={(e) => next(e)} className="next round">Next&#8250;</a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Navigation;