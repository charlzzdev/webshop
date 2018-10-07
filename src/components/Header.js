import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const Header = (props) => {
      function logout() {
            firebase.auth().signOut().then(() => {
                  console.log('logout successful');
            }).catch(err => {
                  console.log(err);
            });
      }

      return(
            <div className="Header">
                  {
                        props.user.email !== '' ? (
                              <ul>
                                    <li><Link to="/add">Add items</Link></li>
                                    <li><Link to="/">View items</Link></li>
                                    <li><Link to="/" onClick={logout}>Logout</Link></li>
                              </ul>
                        ) : (
                              <ul>
                                    <li><Link to="/">View items</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                              </ul>
                        )
                  }
            </div>
      )
}

export default Header;