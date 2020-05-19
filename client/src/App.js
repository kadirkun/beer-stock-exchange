import React, { Component } from 'react'
import {sendClientId, placeOrder} from "./connection/connector"

import Menu from "./components/Menu"
import NavBar from "./components/NavBar"

import logo from './logo.svg'
import './App.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			orderList: {},
			beerData: []
		}

		this.addBeerToBasket = this.addBeerToBasket.bind(this)
		this.removeBeerFromBasket = this.removeBeerFromBasket.bind(this)
		this.placeOrderHandler = this.placeOrderHandler.bind(this)

		sendClientId((newBeerData) => {
			this.setState({
				beerData: newBeerData
			})
		})
	}

	placeOrderHandler() {
		placeOrder(this.state.orderList, {id: 0})
		this.setState({
			orderList: {}
		})
	}

	addBeerToBasket(beer) {
		console.log("Beer added", beer)
		var newOrderList = this.state.orderList
		newOrderList[beer.id] = this.state.orderList[beer.id] !== undefined ? this.state.orderList[beer.id] + 1 : 1

		this.setState({
			orderList: newOrderList
		})
	}

	removeBeerFromBasket(id) {
		var newState = this.state.orderList
		if (newState[id] > 1) {
			newState[id] -= 1
		} else {
			delete newState[id]
		}

		this.setState(newState)
	}

	render() {
		return (
			<div className="App">
				<NavBar 
					beers={this.state.beerData}
					orderList={this.state.orderList}
					removeBeer={this.removeBeerFromBasket}
					placeOrder={this.placeOrderHandler}
				/>
				<Menu
					beers={this.state.beerData}
					addBeer={this.addBeerToBasket}
				/>
			</div>
		)
	}
}

export default App