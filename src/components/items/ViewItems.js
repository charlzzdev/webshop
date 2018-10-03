import React, { Component } from 'react';
import firebase from 'firebase';
import Order from '../order/Order';

class ViewItems extends Component{
      state = {
            items: [
                  
            ],
            inBasket: [

            ]
      }

      componentDidMount(){
            const db = firebase.firestore();
            
            db.settings({
                  timestampsInSnapshots: true
            });

            db.collection('items').get().then((snapshot) => {
                  snapshot.docs.forEach(doc => {
                        let currentState = this.state.items;
                        this.setState({
                              items: [
                                    ...currentState,
                                    {
                                          id: doc.id,
                                          name: doc.data().name,
                                          desc: doc.data().desc
                                    }
                              ]
                        });
                  });
            });
      }

      checked = (e) => {
            let checkedItem = {};
            this.state.items.forEach(item => {
                  if(item.id === e.target.id){
                        checkedItem = {
                              id: item.id,
                              name: item.name,
                              desc: item.desc
                        }
                  }
            });
            if(e.target.checked === true){
                  this.setState({
                        inBasket: [
                              ...this.state.inBasket,
                              checkedItem
                        ]
                  });
            } else {
                  let filteredState = this.state.inBasket.filter(item => item.id !== e.target.id)
                  
                  this.setState({
                        inBasket: [
                              ...filteredState
                        ]
                  });
            }
            
      }

      render(){
            return(
                  <div className="ViewItems">
                        {
                              this.state.items.map(item => {
                                    return(
                                          <div id="item-card" key={item.id}>
                                                <h1 id="item-name">{item.name}</h1>
                                                <h3 id="item-desc">{item.desc}</h3>
                                                <input type="checkbox" onChange={this.checked} id={item.id} />
                                          </div> 
                                    )
                              })
                        }
                        <Order inBasket={this.state.inBasket} />
                  </div>
            )
      }
}

export default ViewItems;