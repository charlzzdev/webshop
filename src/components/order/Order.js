import React, { Component } from 'react';
import firebase from 'firebase';

class Order extends Component {
      state = {
            name: '',
            address: ''
      };

      orderSubmit = (e) => {
            e.preventDefault();

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
                  firebase.firestore().collection('orders').doc().set(items);
            }
      }

      orderInputChanged = (e) => {
            this.setState({
                  [e.target.placeholder]: e.target.value
            });
      }

      render(){
            return(
                  <form onSubmit={this.orderSubmit} className="Order">
                        <span>{this.props.inBasket.length} items are in the basket.</span>
                        <input type="text" placeholder="name" onChange={this.orderInputChanged} />
                        <input type="text" placeholder="address" onChange={this.orderInputChanged} />
                        <button onClick={this.orderSubmit}>Click to order</button>
                  </form>
            )
      }
}

export default Order;