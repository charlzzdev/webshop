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

      setItemImage = (e) => {
            if(this.state.item.name !== ''){
                  Object.entries(e.target.files).forEach(file => {
                        for(let i = 0; i < e.target.files.length; i++){
                              firebase.storage().ref('/itemImages/' + this.state.item.name + '/image' + i + '.jpg').put(file[1]);
                        }
                  });
            }
      }

      render(){
            return(
                  <div className="AddItems" >
                        <form onSubmit={this.submitItem}>
                              <input type="text" id="name" onChange={this.setItemData} placeholder="Name" />
                              <input type="text" id="desc" onChange={this.setItemData} placeholder="Description"/>
                              <input type="file" id="img" onChange={this.setItemImage} multiple/>
                              <button onClick={this.submitItem}>Submit</button>
                        </form>
                  </div>
            )
      }
}

export default AddItems;