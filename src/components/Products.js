import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

class Products extends Component {
  constructor(props){
    super(props);
  }

  render(){

    const products = this.props.products

    if (!products.length) {
      return <div className="alert alert-warning">No product(s) found</div>
    }

    let productItems = products.map((product,id) => {
      return(
        <div key={id} className="product col-xs-12 col-sm-4 col-md-4 text-center">
          <img key={id} src={product.image} className="img-responsive center-block"/>
          <p>{product.title}</p>
          <p>{product.ptype}</p>
          <p>Rs.{product.price}</p>
          <button>
            <span className="glyphicon glyphicon-shopping-cart "></span>
            Add
          </button>
        </div>
     );
    });
    return(
      <div className="products-list">
        <h4 className="text-center ">Showing products length in Mobiles</h4>
        <div className="row">
          {productItems}
        </div>
      </div>
    );
  }
}
export default Products;


