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

            firebase.firestore().collection('orders').get().then(snapshot => {
                  snapshot.docs.forEach(doc => {
                        this.setState({
                              people: [
                                    ...this.state.people,
                                    {
                                          name: doc.data().name,
                                          address: doc.data().address,
                                          orders: doc.data().orders
                                    }
                              ]
                        });
                  });
            });
      }

      render(){
            return(
                  <div className="ManageOrders container">
                        <h1>Manage orders</h1>
                        {
                              this.state.people.map(person => {
                                    return(
                                          <div key={person.address} className="order-details" >
                                                <h2>Name: {person.name}</h2>
                                                <h3>Address: {person.address}</h3>
                                                <h3>Ordered items:</h3>
                                                <ul>
                                                      {
                                                            Object.entries(person.orders).map(order => {
                                                                  return(
                                                                        <li key={order[0]}>{order[1].name}</li>
                                                                  )
                                                            })
                                                      }
                                                </ul>
                                          </div>
                                    )
                              })
                        }
                  </div>
            )
      }
}

export default ManageOrders;