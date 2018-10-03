import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from 'firebase';
import Header from './components/Header';
import AddItems from './components/items/AddItems';
import ViewItems from './components/items/ViewItems';

class App extends Component {
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
      }

      render() {
            return (
                  <BrowserRouter>
                        <div className="App">
                              <Header></Header>
                              <Route path="/add" component={AddItems}/>
                              <Route exact path="/" component={ViewItems}/>
                        </div>
                  </BrowserRouter>
            );
      }
}

export default App;
