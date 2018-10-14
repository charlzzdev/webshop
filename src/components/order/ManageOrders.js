import React, {Component} from 'react';
import firebase from 'firebase';

class ManageOrders extends Component{
      state = {
            people: []
      };

      componentDidMount(){
            firebase.firestore().settings({
                  timestampsInSnapshots: true
            });

            firebase.auth().onAuthStateChanged(user => {
                  if(user){
                        if(this.isUnmounted === false){
                              firebase.firestore().collection('orders').get().then(snapshot => {
                                    snapshot.docs.forEach(doc => {
                                          let orders = [];
            
                                          doc.data().orders.forEach(order => {
                                                if(order.addedBy === user.email){
                                                      orders = [
                                                            ...orders,
                                                            order
                                                      ]
                                                }
                                          });
            
                                          if(orders.length > 0){
                                                this.setState({
                                                      people: [
                                                            ...this.state.people,
                                                            {
                                                                  name: doc.data().name,
                                                                  address: doc.data().address,
                                                                  orders
                                                            }
                                                      ]
                                                });
                                          }
                                    });
                              });
                        }
                  } else {
                        if(this.isUnmounted === false){
                              this.setState({
                                    people: []
                              });
                        }
                  }
            });
      }

      componentWillUnmount(){
            this.isUnmounted = true;
      }

      componentWillMount(){
            this.isUnmounted = false;
      }

      render(){
            return(
                  <div className="ManageOrders container">
                        <h1>Manage orders</h1>
                        {
                              this.state.people.length !== 0 ? (
                                    this.state.people.map(person => {
                                          return(
                                                person.orders.length !== 0 ? (
                                                      <div key={person.address} className="order-details" >
                                                            <h2>Name: {person.name}</h2>
                                                            <h3>Address: {person.address}</h3>
                                                            <h3>Ordered items:</h3>
                                                            <ul>
                                                                  {
                                                                        person.orders.map(order => {
                                                                              return(
                                                                                    <li key={order.id}>{order.name}</li>
                                                                              )
                                                                        })
                                                                  }
                                                            </ul>
                                                      </div>
                                                ) : (null)
                                          )
                                    })
                              ) : (
                                    <h1>You're not authenticated.</h1>
                              )
                        }
                  </div>
            )
      }
}

export default ManageOrders;