import React, { Component } from 'react';
import firebase from 'firebase';

class AddItems extends Component{
      state = {
            item: {
                  name: '',
                  desc: ''
            },
            user: {
                  email: ''
            }
      };

      componentDidMount(){
            const db = firebase.firestore();
            
            db.settings({
                  timestampsInSnapshots: true
            });

            firebase.auth().onAuthStateChanged(user => {
                  if(user){
                        this.setState({
                              user: {
                                    email: user.email
                              }
                        });
                  } else {
                        this.props.history.push('/');
                  }
            });
      }

      submitItem = (e) => {
            e.preventDefault();
            
            firebase.auth().onAuthStateChanged(user => {
                  if(user){
                        let item = this.state.item;
                        if(item.name !== '' && item.desc !== ''){
                              firebase.firestore().collection('items').add({
                                    name: this.state.item.name,
                                    desc: this.state.item.desc,
                                    addedBy: user.email
                              });
                        }
                  }
            });
      }

      setItemData = (e) => {
            let currentState = this.state.item;
            this.setState({
                  item: {
                        ...currentState,
                        [e.target.id]: e.target.value
                  }
            });
      }

      setItemImage = (e) => {
            let files = e.target.files;

            firebase.auth().onAuthStateChanged(user => {
                  if(user){
                        if(this.state.item.name !== ''){
                              Object.entries(files).forEach(file => {
                                    for(let i = 0; i < files.length; i++){
                                          firebase.storage().ref('/itemImages/' + this.state.item.name + '/image' + i + '.jpg').put(file[1]);
                                    }
                              });
                        }
                  }
            });
      }

      render(){
            return(
                  <div className="AddItems" >
                        {
                              this.state.user.email !== '' ? (
                                    <form onSubmit={this.submitItem}>
                                          <input type="text" id="name" onChange={this.setItemData} placeholder="Name" />
                                          <input type="text" id="desc" onChange={this.setItemData} placeholder="Description"/>
                                          <input type="file" id="img" onChange={this.setItemImage} multiple/>
                                          <button onClick={this.submitItem}>Submit</button>
                                    </form>
                              ) : (
                                    <h1>You're not authenticated.</h1>
                              )
                        }
                  </div>
            )
      }
}

export default AddItems;