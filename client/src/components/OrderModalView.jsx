import React, { Component } from "react"
import { Modal, Button, Table } from "react-bootstrap"

class OrderView extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            placeOrderState: false
        }

        this.generateBeerList = this.generateBeerList.bind(this)
        this.placeOrderHandler = this.placeOrderHandler.bind(this)
    }

    removeHandler(id) {
        this.props.removeBeer(id)
    }

    placeOrderHandler() {
        this.props.onHide()
        this.props.placeOrder()
    }

    generateBeerList() {
        var beers = []
        var orderflag = true
        for (var beerId in this.props.orderList) {
            var b = this.props.beers.find((beer) => {
                return beer.id == beerId ? true : false
            })
            orderflag =  b.quantity >= this.props.orderList[beerId]
            beers.push({
                info: b,
                color: b.quantity < this.props.orderList[beerId] ? "text-danger" : "",
                quantity: this.props.orderList[beerId]
            }) 
        }

        this.state = {
            placeOrderState: orderflag
        }

        return (beers.map(
            (beer) => (
                <tr className={beer.color}>
                    <td>{beer.info.name}</td>
                    <td>{beer.info.description}</td>
                    <td>{beer.quantity}/{beer.info.quantity}</td>
                    <td>{beer.quantity}</td>
                    <td>{(beer.quantity * beer.info.price.current).toFixed(2)}</td>
                    <td>
                        <Button variant="danger" onClick={() => this.removeHandler(beer.info.id)}>Remove</Button>
                    </td>
                </tr>
            )
        ))
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Order Information
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Beer Name</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Quantity</th>
                                <th>Mid Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.generateBeerList()}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    {this.state.placeOrderState ? (
                        <Button onClick={this.placeOrderHandler} >Place Order</Button>
                    ) : (
                        <Button variant="danger" disabled>Place Order</Button>
                    )}
                    
                </Modal.Footer>
            </Modal>

        )
    }
}

export default OrderView