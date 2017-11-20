import React, { Component } from 'react';

class Filterbytype extends Component {
render() {
  return (
      <div>
        <p>Filter by types:</p>
        <input type="checkbox" value="smartphone" onChange={this.props.filterByType} />
        	<span>Smart phone</span><br />
        <input type="checkbox" value="iphone" onChange={this.props.filterByType} />
        	<span>iphone</span><br />
      </div>
    );
 }
}
export default Filterbytype;























