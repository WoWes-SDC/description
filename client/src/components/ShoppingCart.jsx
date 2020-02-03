import React from 'react';
import axios from 'axios';

class ShoppingCart extends React.Component {
  
  /*
  setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
  }
  */

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    }
    this.addToCart = this.addToCart.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addToCart(e) {
    e.preventDefault();
    let quantity = this.state.quantity;
    console.log('posting a request to shopping cart for quantity', quantity);
    axios.post('http://127.0.0.1:3001/shoppingCart', {quantity : quantity})
    .then(() => {
      console.log('Posted to shopping cart');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleChange(e) {
    this.setState({quantity : e.target.value});
  }

  increaseQuantity(e) {
    e.preventDefault();
    let currentQuantity = this.state.quantity;
    let newQuantity = currentQuantity+1;
    this.setState({ quantity : newQuantity});
  }

  decreaseQuantity(e) {
    e.preventDefault();
    let currentQuantity = this.state.quantity;
    if (currentQuantity > 1) {
      this.setState({quantity: currentQuantity-1});
    }
  }
  
  render() {
    return (
      <div>
        <div className="tom-grid-100">
          <div className="tom-cart-buttons">
            <div className="tom-cart-button-group">
              <button type="button" className="tom-cart-adjuster" onClick={this.decreaseQuantity}><i>-</i></button>
              <input id="tom-cart-value" className="tom-cart-quantity" value={this.state.quantity} onChange={this.handleChange}></input>
              <button type="button" className="tom-cart-adjuster" onClick={this.increaseQuantity}><i>+</i></button>
            </div>
          </div>
          <div className="tom-cart">
            <button type="submit" className="tom-cart-submit" onClick={this.addToCart}>Add To Cart</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingCart;