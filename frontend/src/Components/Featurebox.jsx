import React from 'react';

function Featurebox({ image, title }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card bg-black border-danger" style={{ height: '100%' }}>
        <img
          src={image}
          className="card-img-top p-3"
          alt={title}
          style={{
            height: '200px',
            width: '100%',
            objectFit: 'contain', // Changed to 'contain' to avoid cropping
          }}
        />
        <div className="card-body text-center d-flex flex-column" style={{ minHeight: '200px' }}>
          <h5 className="card-title text-white">{title}</h5>
          <p className="card-text text-light" style={{ flexGrow: 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo aperiam ipsam laudantium consequatur earum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Featurebox;
