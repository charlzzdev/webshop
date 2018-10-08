import React from 'react';
import firebase from 'firebase';

const Register = () => {
      function register(e) {
            e.preventDefault();

            let email = document.querySelector('#registerEmailInput');
            let password = document.querySelector('#registerPasswordInput');
            
            if(email !== '' && password !== ''){
                  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(() => {
                        console.log('register successful');
                  }).catch(error => {
                        console.log(error);
                  });
            }
      }

      return(
            <div className="Register container">
                  <h1>Register</h1>
                  <form onSubmit={register} >
                        <input type="email" placeholder="E-mail" id="registerEmailInput"/>
                        <input type="password" placeholder="password" id="registerPasswordInput"/>
                        <button onSubmit={register}>Register</button>
                  </form>
            </div>
      )
}

export default Register;