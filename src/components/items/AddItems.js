import React, { Component } from 'react';
import firebase from 'firebase';

class AddItems extends Component{
      state = {
            item: {
                  name: '',
                  desc: ''
            }
      }

      componentDidMount(){
            const db = firebase.firestore();
            
            db.settings({
                  timestampsInSnapshots: true
            });
      }

      submitItem = (e) => {
            e.preventDefault();
            
            let item = this.state.item;
            if(item.name !== '' && item.desc !== ''){
                  firebase.firestore().collection('items').add({
                        name: this.state.item.name,
                        desc: this.state.item.desc
                  });
            }
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

      render(){
            return(
                  <div className="AddItems" >
                        <form onSubmit={this.submitItem}>
                              <div>
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" id="name" onChange={this.setItemData} />
                              </div>
                              <div>
                                    <label htmlFor="desc">Description: </label>      
                                    <input type="text" id="desc" onChange={this.setItemData} />
                              </div>
                              <button onClick={this.submitItem}>Submit</button>
                        </form>
                  </div>
            )
      }
}

export default AddItems;