/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */  
/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import axios from 'axios';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.addToCart = this.addToCart.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addToCart(e) {
    e.preventDefault();
    const currentQuantity = this.state.quantity;
    const newEvent = new CustomEvent('tomCart', {
      detail: currentQuantity,
    });
    window.dispatchEvent(newEvent);
    /* INITIAL DEPLOYMENT, BEFORE WE CHANGED TO USING EVENTS TO CHANGE STATE ON OTHER COMPONENTS
    axios.post('http://jordantopbar-env.bpppx4cenp.us-east-2.elasticbeanstalk.com/shoppingCart', {quantity : quantity})
    .then(() => {
      console.log('Posted to shopping cart');
    })
    .catch((error) => {
      console.log(error);
    })
    */
  }

  handleChange(e) {
    let newValue = e.target.value;
    if (e.target.value.isNaN || e.target.value < 1) {
      newValue = 1;
    }
    this.setState({ quantity: newValue });
  }

  increaseQuantity(e) {
    e.preventDefault();
    const currentQuantity = this.state.quantity;
    const newQuantity = currentQuantity + 1;
    this.setState({ quantity: newQuantity });
  }

  decreaseQuantity(e) {
    e.preventDefault();
    const currentQuantity = this.state.quantity;
    if (currentQuantity > 1) {
      this.setState({ quantity: currentQuantity - 1 });
    }
  }

  // I had to comment out { quantity } as a parameter/prop, so I could render the component
  render(
    // { quantity } --> value={quantity} --> added to input after className
  ) {
    return (
      <div>
        <div className="tom-grid-100 tom-cart-group">
          <div className="tom-cart-buttons">
            <div className="tom-cart-button-group">
              <button type="button" className="tom-cart-adjuster" onClick={this.decreaseQuantity}><i>-</i></button>
              <input id="tom-cart-value" className="tom-cart-quantity" onChange={this.handleChange} /> 
              <button type="button" className="tom-cart-adjuster" onClick={this.increaseQuantity}><i>+</i></button>
            </div>
          </div>
          <div className="tom-cart">
            <button type="submit" className="tom-cart-submit" onClick={this.addToCart}>ADD TO CART</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
