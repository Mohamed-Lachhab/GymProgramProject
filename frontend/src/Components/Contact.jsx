import React from 'react';

function Contact() {
  return (
    <div id="contact" className="py-5 bg-black text-white text-center">
      <h1 className="mb-4">CONTACT</h1>
      <form className="container w-50">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Full Name" />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Type Your E-mail" />
        </div>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Write Here..." rows="5"></textarea>
        </div>
        <button type="submit" className="btn btn-danger w-100">Send</button>
      </form>
    </div>
  );
}

export default Contact;
