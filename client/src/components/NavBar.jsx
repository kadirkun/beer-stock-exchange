import React, { Component } from "react"
import {Navbar, Nav, Button, Badge} from "react-bootstrap"
import OrderModalView from "./OrderModalView"

import PAGES from "../config/PAGES"

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderViewVisibility: false
        }
        this.orderButtonHandler = this.orderButtonHandler.bind(this)
        this.orderViewToggle = this.orderViewToggle.bind(this)
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this)
    }

    orderButtonHandler() {
        this.orderViewToggle(true)
    }

    orderViewToggle(viewState) {
        this.setState({
            orderViewVisibility: viewState
        })
    }

    calculateTotalPrice() {
        var totalCost = 0
        for (var beerId in this.props.orderList) {
            var beer = this.props.beers.find((beer) => {
                return beer.id == beerId ? true : false
            })
            totalCost += beer.price.current * this.props.orderList[beerId]
        }

        return totalCost
    }

    render() {
        console.log("orderlist:", this.props.orderList)

        const totalCost = this.calculateTotalPrice()

        return (
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="#home">Beer Stock Exchange</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link 
                        onClick={() => this.props.pageController(PAGES.BEERS)}
                        className={this.props.currentPage == PAGES.BEERS ? "active" : ""}
                    >Beers</Nav.Link>
                    <Nav.Link 
                        onClick={() => this.props.pageController(PAGES.ORDERS)}
                        className={this.props.currentPage == PAGES.ORDERS ? "active" : ""}
                    >Orders</Nav.Link>
                </Nav>
                {
                    this.props.clientDetails.admin ? 
                    (<div></div>) : (
                        <div>
                            <Button variant="light" onClick={this.orderButtonHandler}>
                                Order <Badge variant="warning">{totalCost.toFixed(2)}</Badge>
                            </Button>
                            <OrderModalView
                                show={this.state.orderViewVisibility}
                                onHide={() => this.orderViewToggle(false)}
                                beers={this.props.beers}
                                orderList={this.props.orderList}
                                removeBeer={this.props.removeBeer}
                                placeOrder={this.props.placeOrder}
                            />
                        </div>
                    )
                }
            </Navbar>
            
        )
    }
}

export default NavBar