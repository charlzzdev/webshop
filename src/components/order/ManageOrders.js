import React, {Component} from 'react';
import firebase from 'firebase';

class ManageOrders extends Component{
      state = {
            user: '',
            people: []
      };

      componentDidMount(){
            firebase.firestore().settings({
                  timestampsInSnapshots: true
            });

            firebase.auth().onAuthStateChanged(user => {
                  if(user && this.isUnmounted === false){
                        this.setState({
                              user: user.email
                        });

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
      
                                    if(orders.length > 0 && this.isUnmounted === false){
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

                                    if(doc.data().orders.length === 0){
                                          firebase.firestore().collection('orders').doc(doc.data().address).delete();
                                    }
                              });
                        });
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

      deleteOrder = (e) => {
            let item = e.target.parentElement.children[1].childNodes[1].textContent;
            let deletedItem = e.target.parentElement;
            deletedItem.innerHTML = 'Deleted.';
            setInterval(() => deletedItem.remove(), 1000);
            
            if(this.state.user !== ''){
                  firebase.firestore().collection('orders').doc(item).get().then(doc => {
                        let filterOrdersFromThisUser;
                        doc.data().orders.forEach(order => {
                              if(order.addedBy === this.state.user){
                                    filterOrdersFromThisUser = doc.data().orders.filter(orderFromThisUser => orderFromThisUser.addedBy !== order.addedBy);
                              }
                        });

                        let setFirestore =  {
                              ...doc.data(),
                              orders: filterOrdersFromThisUser
                        };
                        firebase.firestore().collection('orders').doc(item).set(setFirestore);
                  });
            }
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
                                                            <button onClick={this.deleteOrder}>Done</button>
                                                      </div>
                                                ) : (null)
                                          )
                                    })
                              ) : (
                                    <h1>You don't have any orders.</h1>
                              )
                        }
                  </div>
            )
      }
}

export default ManageOrders;