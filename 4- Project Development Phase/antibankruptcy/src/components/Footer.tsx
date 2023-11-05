import React from 'react'

function Footer() {
  const contributors = ['Pranav Murthy', 'Rejona Susan', 'Anais Anand', 'Harish P'];

  return (
    <footer className="bg-dark text-light text-center px-3 d-flex justify-content-between">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <p>Contributors: {contributors.join(', ')}</p>
    </footer>
  );
}

export default Footer