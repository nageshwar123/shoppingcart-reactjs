import React, { Component } from 'react';


class Searchform extends Component {

	render() {

  	return (
  	  <label>Search
				<input type="text" className="form-control" placeholder="Search" onChange={this.props.filterBySearch}/>
			</label>
	  );

	 }
}
export default Searchform;



























