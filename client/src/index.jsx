/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Description from './components/Description.jsx';
import Pricing from './components/Pricing.jsx';
import LowStock from './components/LowStock.jsx';
import OtherStoresModal from './components/OtherStoresModal.jsx';
import SaveShare from './components/SaveShare.jsx';
import ShipAvailability from './components/ShipAvailability.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import StoreAvailability from './components/StoreAvailability.jsx';
import Warranty from './components/Warranty.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 3.98,
      name: 'Bob the Dinosaur',
      productId: 1,
      descriptions: ['This is really useful', 'You should buy this', 'Buy extra for your friends, if you have some'],
    };
    this.clickSave = this.clickSave.bind(this);
    this.clickShare = this.clickShare.bind(this);
    this.clickStores = this.clickStores.bind(this);
    this.clickStoresClose = this.clickStoresClose.bind(this);
    this.getNewProductId = this.getNewProductId.bind(this);
  }

  componentDidMount() {
    axios.get('http://wowes-env-1.jnkdqwmw8j.us-east-2.elasticbeanstalk.com/items', {
      params: {
        ID: this.state.productId,
      },
    })
      .then((result) => {
        this.setState({
          price: result.data[0].price.toFixed(2) || 3.98,
          name: result.data[0].name || 'Bob the Dinosaur',
        });
      })
      .catch((error) => {
        console.log(error);
      });
    /* WROTE THIS FOR EVENT TESTING PURPOSES
    window.addEventListener('tomCart', (event) => {
      console.log('event heard')
      this.checkForEvent(event)
    })
    */
    window.addEventListener('jordanAwesome', this.getNewProductId);
  }

  /* WROTE THIS FOR EVENT TESTING PURPOSES
  checkForEvent(e) {
    console.log('detected an event');
    console.log('finding the right value', e.detail);
    //this.setState({productId : this.state.productId++})
    //console.log(this.state.productId);
  */

  getNewProductId(e) {
    console.log('e.dtail', e.detail);
    this.setState({ productId: e.detail });
    axios.get('http://wowes-env-1.jnkdqwmw8j.us-east-2.elasticbeanstalk.com/items', {
      params: {
        ID: e.detail,
      },
    })
      .then((result) => {
        this.setState({
          price: result.data[0].price.toFixed(2) || 3.98,
          name: result.data[0].name || 'Bob the Dinosaur',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clickSave() {
    // eslint-disable-next-line no-console
    console.log(`Saved ${this.state.name}, with id of ${this.state.productId}, or would if we had back-end save functionality.`);
  }

  clickShare() {
    document.getElementById('tom-modal-share').style.display = 'block';
  }

  clickShareClose() {
    document.getElementById('tom-modal-share').style.display = 'none';
  }

  clickStores() {
    document.getElementById('tom-modal-stores').style.display = 'block';
  }

  clickStoresClose() {
    document.getElementById('tom-modal-stores').style.display = 'none';
  }

  render() {
    return (
      <div className="tom-component">
        <Pricing
          price={this.state.price}
          id={this.state.productId}
        />
        <LowStock
          id={this.state.productId}
        />
        <Description
          id={this.state.productId}
          bullets={this.state.descriptions}
        />
        <Warranty id={this.state.productId} />
        <hr className="tom-ruler" />
        <div className="tom-grid-100">
          <ShoppingCart name={this.state.name} price={this.state.price} />
          <SaveShare
            url="http://www.google.com"
            image0="https://pbs.twimg.com/profile_banners/98042827/1528588486/1080x360"
            save={this.clickSave}
            share={this.clickShare}
            shareClose={this.clickShareClose}
            id={this.state.productId}
            name={this.state.name}
          />
        </div>
        <hr className="tom-ruler" />
        <div className="tom-grid-100">
          <StoreAvailability
            id={this.state.productId}
            stores={this.clickStores}
            storesClose={this.clickStoresClose}
          />
          <ShipAvailability
            price={this.state.price}
            id={this.state.productId}
          />
        </div>
        <OtherStoresModal
          close={this.clickStoresClose}
          stores={this.clickStores}
          id={this.state.productId}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('tom'));
