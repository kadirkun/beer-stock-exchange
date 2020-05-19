import React, { Component } from "react"
import {Navbar, Nav, Button, Badge} from "react-bootstrap"
import OrderView from "./OrderView"

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
                    <Nav.Link href="#home">Beers</Nav.Link>
                    <Nav.Link href="#features">Orders</Nav.Link>
                </Nav>
                <Button variant="light" onClick={this.orderButtonHandler}>
                    Order <Badge variant="warning">{totalCost.toFixed(2)}</Badge>
                </Button>
                <OrderView
                    show={this.state.orderViewVisibility}
                    onHide={() => this.orderViewToggle(false)}
                    beers={this.props.beers}
                    orderList={this.props.orderList}
                    removeBeer={this.props.removeBeer}
                    placeOrder={this.props.placeOrder}
                />
            </Navbar>
            
        )
    }
}

export default NavBar