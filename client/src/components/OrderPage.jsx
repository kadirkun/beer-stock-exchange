import React, { Component } from "react"
import { Card, Table, Button } from "react-bootstrap"

class OrderPage extends Component {
    constructor(props) {
        super(props)

        this.generateOrders = this.generateOrders.bind(this)
    }

    prepareList(order) {
        var beers = []
        for (var beerId in order) {
            var b = this.props.beers.find((beer) => {
                return beer.id == beerId ? true : false
            })
            if (b != undefined) {
                beers.push({
                    info: b,
                    quantity: order[beerId]
                })
            }
        }

        return (beers.map(
            (beer) => (
                <tr>
                    <td>{beer.info.name}</td>
                    <td>{beer.info.description}</td>
                    <td>{beer.info.price.current}</td>
                    <td>{beer.quantity}</td>
                    <td>{(beer.quantity * beer.info.price.current).toFixed(2)}</td>
                </tr>
            )
        ))
    }

    prepareCard(doc) {
        return (
            <Card className="m-5">
                <Card.Header>
                    {doc.clientDetails.id}
                    {this.props.clientDetails.admin ?
                        (
                            <Button 
                                className="float-right"
                                variant="success"
                                onClick={() => this.props.executeOrder(doc)}
                            >
                                Served
                            </Button>
                        ) :
                        (<div></div>)
                    }
                </Card.Header>
                <Card.Body className="container-fluid">
                    <Table>
                        <thead>
                            <tr>
                                <th>Beer Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Mid Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.prepareList(doc.order)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }

    generateOrders() {
        console.log("Order Page:", this.props.orders)
        return this.props.orders.filter((dataNode) => {
            if (this.props.clientDetails.admin) {
                return true
            } else {
                return dataNode.clientDetails.id == this.props.clientDetails.id ? true : false
            }
        }).map((dataNode) => {
            return (
                <>
                    {this.prepareCard(dataNode)}
                </>
            )
        })
    }

    render() {
        return (
            <div>
                {this.generateOrders()}
            </div>
        )
    }
}

export default OrderPage