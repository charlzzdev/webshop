import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from 'firebase';
import Header from './components/Header';
import AddItems from './components/items/AddItems';
import ViewItems from './components/items/ViewItems';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

class App extends Component {
      state = {
            user: {
                  email: ''
            }
      }

      constructor(){
            super();

            const config = {
                  apiKey: "AIzaSyAnfTXUhMgENtNciW8T72LQW0c8CyfVv8k",
                  authDomain: "charlzzdev-webshop.firebaseapp.com",
                  databaseURL: "https://charlzzdev-webshop.firebaseio.com",
                  projectId: "charlzzdev-webshop",
                  storageBucket: "charlzzdev-webshop.appspot.com",
                  messagingSenderId: "630065336775"
            };

            firebase.initializeApp(config);

            firebase.auth().onAuthStateChanged(user => {
                  if(user){
                        this.setState({
                              user: {
                                    email: user.email
                              }
                        });
                  } else {
                        this.setState({
                              user: {
                                    email: ''
                              }
                        });
                  }
            });
      }

      render() {
            return (
                  <BrowserRouter>
                        <div className="App">
                              <Header user={this.state.user}></Header>
                              <Route path="/add" component={AddItems}/>
                              <Route exact path="/" component={ViewItems}/>
                              <Route path="/login" component={Login} />
                              <Route path="/register" component={Register} />
                        </div>
                  </BrowserRouter>
            );
      }
}

export default App;
