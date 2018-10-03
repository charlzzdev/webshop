import React, { Component } from 'react';
import firebase from 'firebase';

class Order extends Component {
      state = {
            name: '',
            address: ''
      };

      orderClicked = () => {
            let items = {
                  name: this.state.name,
                  address: this.state.address,
                  orders: {}
            };
            this.props.inBasket.forEach(item => {
                  items.orders = {
                        ...items.orders,
                        [item.id]: item
                  }
            });

            if(this.state.name !== ''){
                  firebase.firestore().collection('orders').doc(this.state.name).set(items);
            }
      }

      nameChanged = (e) => {
            this.setState({
                  [e.target.placeholder]: e.target.value
            });
      }

      render(){
            return(
                  <div className="Order">
                        <span>{this.props.inBasket.length} items are in the basket.</span>
                        <input type="text" placeholder="name" onChange={this.nameChanged} />
                        <input type="text" placeholder="address" onChange={this.nameChanged} />
                        <button onClick={this.orderClicked}>Click to order</button>
                  </div>
            )
      }
}

export default Order;