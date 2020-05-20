import React, { Component } from 'react'
import {
	sendClientId,
	placeOrder,
	subscribeGetOrder,
	deleteBeer,
	pushBeer,
	executeOrder
} from "./connection/connector"

import Menu from "./components/Menu"
import NavBar from "./components/NavBar"
import OrderPage from "./components/OrderPage"
import InitView from "./components/InitView"
import AdminMenu from "./components/AdminMenu"

import PAGES from "./config/PAGES"
import logo from './logo.svg'
import './App.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			orders: [],
			orderList: {},
			beerData: [],
			clientDetails: {},
			currentPage: PAGES.BEERS
		}

		this.connecToServer = this.connecToServer.bind(this)
		this.addBeerToBasket = this.addBeerToBasket.bind(this)
		this.removeBeerFromBasket = this.removeBeerFromBasket.bind(this)
		this.placeOrderHandler = this.placeOrderHandler.bind(this)
		this.pageChangeHandler = this.pageChangeHandler.bind(this)
		this.pageController = this.pageController.bind(this)
		this.init = this.init.bind(this)
	}

	connecToServer() {
		fetch("/")
	}

	componentDidMount() {
		this.connecToServer()
	}

	init(initDoc) {
		this.setState({
			clientDetails: initDoc
		})

		sendClientId((newBeerData) => {
			this.setState({
				beerData: newBeerData
			})
		})

		subscribeGetOrder(initDoc, (newOrders) => {
			this.setState({
				orders: newOrders
			})
		})

		console.log("DEVICE INIT: ", initDoc)
	}

	placeOrderHandler() {
		var preperedOrder = Object.keys(this.state.orderList).reduce((pre, key) => {
			var beer = this.state.beerData.find((b) => {return b.id == key})
			beer.quantity = this.state.orderList[key]
			pre[key] = beer
			return pre
		}, {})

		placeOrder(preperedOrder, this.state.clientDetails)
		this.setState({
			orderList: {}
		})
		subscribeGetOrder(this.state.clientDetails, (newOrders) => {
			this.setState({
				orders: newOrders
			})
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

	pageChangeHandler(pageId) {
		this.setState({
			currentPage: pageId
		})
	}

	pageController() {
		if (this.state.currentPage == PAGES.BEERS) {
			if (this.state.clientDetails.admin == true) {
				return (
					<AdminMenu
						beers={this.state.beerData}
						pushBeer={pushBeer}
						removeBeer={deleteBeer}
					/>
				)
			} else {
				return (
					<Menu
						beers={this.state.beerData}
						addBeer={this.addBeerToBasket}
						orderList={this.state.orderList}
					/>
				)
			}
		} else if (this.state.currentPage == PAGES.ORDERS) {
			return (
				<OrderPage
					orders={this.state.orders}
					beers={this.state.beerData}
					clientDetails={this.state.clientDetails}
					executeOrder={executeOrder}
				/>
			)
		} else {
			return (
				<div>

				</div>
			)
		}
	}

	render() {
		return (
			<div className="App">
				{
					Object.keys(this.state.clientDetails).length == 0 ?
					(
						<InitView
							init={this.init}
						/>
					):(
						<div>
							<NavBar 
								beers={this.state.beerData}
								orderList={this.state.orderList}
								removeBeer={this.removeBeerFromBasket}
								placeOrder={this.placeOrderHandler}
								pageController={this.pageChangeHandler}
								currentPage={this.state.currentPage}
								clientDetails={this.state.clientDetails}
							/>
							{this.pageController()}
						</div>
					)
				}
			</div>
		)
	}
}

export default App