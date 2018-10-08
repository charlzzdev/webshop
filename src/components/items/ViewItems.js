import React, { Component } from 'react';
import firebase from 'firebase';
import Order from '../order/Order';

class ViewItems extends Component{
      state = {
            items: [
                  
            ],
            inBasket: [

            ]
      };

      componentDidMount(){
            const db = firebase.firestore();
            const storage = firebase.storage();

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
                                          desc: doc.data().desc,
                                          addedBy: doc.data().addedBy
                                    }
                              ]
                        });

                        storage.ref().child('/itemImages/' + doc.data().name + '/image0.jpg').getDownloadURL().then(url => {
                              let itemImage = document.getElementById(doc.data().name);
                              itemImage.src = url;
                        }).catch(err => {
                              console.log(err);
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
                              desc: item.desc,
                              addedBy: item.addedBy
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
                        <div className="item-list">
                              {
                                    this.state.items.map(item => {
                                          return(
                                                <div id="item-card" key={item.id}>
                                                      <h1 id="item-name">{item.name}</h1>
                                                      <h3 id="item-desc">{item.desc}</h3>
                                                      <div>
                                                            <img src="" id={item.name} alt=""/>
                                                      </div>
                                                      <h5>Added by: {item.addedBy}</h5>
                                                      <input type="checkbox" onChange={this.checked} id={item.id} />
                                                </div> 
                                          )
                                    })
                              }
                        </div>
                        <Order inBasket={this.state.inBasket} />
                  </div>
            )
      }
}

export default ViewItems;