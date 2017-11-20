import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Products from './components/Products';
import Footer from './components/Footer';
import RelatedProducts from './components/RelatedProducts';
import _ from 'lodash';
import Searchform from './components/Searchform';
import Filterbytype from './components/Filterbytype';
import { Grid, Row, Col } from 'react-bootstrap';
import alasql from 'alasql'

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products: [],
			result: [],  // List of filtered products
			isLoading: false,
			filters: {
				search: '',
				types: [],
				os: [],
			} // will be added synamically
	}

	this.filterBySearch = this.filterBySearch.bind(this)
	this.filterByType = this.filterByType.bind(this)

	}
	componentWillMount(){
		this.setState({
			isLoading: true
		})
		axios.get('https://api.myjson.com/bins/4xc0c')
		.then( (response) => {
			this.setState({
				products: response.data.products,
				result: response.data.products,
				isLoading: false
			});

		})
		.catch( (error) => {
			this.setState({
				isLoading: false
			})
		});
	}

	filterBySearch (e) {
		const value = e.target.value
		let newFilters = this.state.filters
		newFilters.search = value

		let newState = _.extend(this.state, {
			filters: newFilters
		})

		this.setState(newState, () => {
			this.filterProducts()
		})

	}

	filterByType (e) {

		const value = e.target.value
		const checked = e.target.checked

		let newFilters = this.state.filters
		if (checked) {
			newFilters.types.push(value)
		} else {
			newFilters.types = _.without(newFilters.types, value)
		}

		let newState = _.extend(this.state, {
			filters: newFilters
		})

		this.setState(newState, () => {
			this.filterProducts()
		})

	}

	filterProducts () {
		let products = this.state.products
		let filters = this.state.filters
		console.log('Filters = ', filters)

		let whereClause = ''

		_.forEach(filters, function(value, key) {

			if (_.isEmpty(value)) {
				return
			}

			switch(key) {
				case 'search':
					whereClause += 'title like "%'+ value +'%"'
					break;
				case 'types':

					if (whereClause) {
						whereClause += ' AND '
					}
					whereClause += '('
					_.forEach(value, function(type, key) {
						if (key) {
							whereClause += ' OR '
						}
						whereClause += 'ptype like "%'+ type +'"'
					})
					whereClause += ')'


				break;
			}

		});


		let sql = 'SELECT * FROM ?'
		if (whereClause) {
			sql = 'SELECT * FROM ? WHERE(' + whereClause + ')'
		}
		let result = alasql(sql, [products])
		console.log('result', result)

		this.setState({
			result
		})
	}

	render() {



		if (this.state.isLoading) {
			return <div className="loader">Loading...</div>
		}

		const result = this.state.result

	  return (
	  		<div className="App">
		    	<Header />
	  			<Grid>
			    	<Row>
			    	<Col sm={3}>
			    		<Searchform filterBySearch={this.filterBySearch}/>
			    		<Filterbytype filterByType={this.filterByType}/>
			    	</Col>
			    	<Col sm={9}>
				    	<Products products={result} />
				    	<RelatedProducts />
			    	</Col>
			    	</Row>
			    </Grid>
		    	<Footer />
	    	</div>
	    );
	 }
}
export default App;

