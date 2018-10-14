import React from 'react';
import firebase from 'firebase';

const Login = () => {
      function login(e) {
            e.preventDefault();

            let email = document.querySelector('#loginEmailInput');
            let password = document.querySelector('#loginPasswordInput');
            let title = document.querySelector('.Login h1');
            let form = document.querySelector('.Login form');

            firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {
                  console.log('login successful');
                  title.innerHTML = 'Logged in.';
                  form.setAttribute('style', 'display: none;');
            }).catch(err => {
                  console.log(err);
            });
      }

      return(
            <div className="Login container">
                  <h1>Login</h1>
                  <form onSubmit={login} >
                        <input type="email" placeholder="E-mail" id="loginEmailInput"/>
                        <input type="password" placeholder="Password" id="loginPasswordInput"/>
                        <button onSubmit={login}>Login</button>
                  </form>
            </div>
      )
}

export default Login;