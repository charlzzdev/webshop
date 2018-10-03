import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
      return(
            <div className="Header">
                  <ul>
                        <li><Link to="/add">Add items</Link></li>
                        <li><Link to="/">View items</Link></li>
                        <li>Login</li>
                        <li>Register</li>
                  </ul>
            </div>
      )
}

export default Header;