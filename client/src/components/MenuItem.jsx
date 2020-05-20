import React, { Component } from "react"
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap"
import beerImg from "../images/beer-ramadan-friendly.jpg"

class MenuItem extends Component {
    constructor(props) {
        super(props)
        console.log(props)

        this.addBeerHandler = this.addBeerHandler.bind(this)
    }

    addBeerHandler() {
        this.props.addBeer(this.props.beer)
    }

    render() {
        const beer = this.props.beer

        return (
            <Card md={2}>
                <Card.Img variant="top" src={beerImg} />
                <Card.Body>
                    <Card.Title>{beer.name}</Card.Title>
                    <Card.Text>
                        {beer.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem variant="danger">Max: {this.props.beer.quantity ? beer.price.max.toFixed(2) : "No Price"}</ListGroupItem>
                    <ListGroupItem variant="warning">Current: {this.props.beer.quantity ? beer.price.current.toFixed(2) : "No Price"}</ListGroupItem>
                    <ListGroupItem variant="success">Min: {this.props.beer.quantity ? beer.price.min.toFixed(2) : "No Price"}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    {
                        this.props.beer.quantity ? 
                        <Button variant="primary" onClick={this.addBeerHandler} block>Bring Me</Button> :
                        <Button variant="primary" block disabled>Bring Me</Button>

                    }
                </Card.Body>
            </Card>
        )
    }
}

export default MenuItem