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
                    <ListGroupItem variant="danger">Max: {beer.price.max}</ListGroupItem>
                    <ListGroupItem variant="warning">Current: {beer.price.current}</ListGroupItem>
                    <ListGroupItem variant="success">Min: {beer.price.min}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button variant="primary" onClick={this.addBeerHandler} block>Bring Me</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default MenuItem