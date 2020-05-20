import React, { Component } from "react"
import { Card, Form, CardColumns, Button } from "react-bootstrap"
import { v4 } from "uuid"

var changeTypes = {
    NAME: "NAME",
    DESCRIPTION: "DESCRIPTION",
    PRICE: "PRICE",
    QUANTITY: "QUANTITY"
}

class AdminMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            beers: this.props.beers
        }

        this.generateCards = this.generateCards.bind(this)
        this.addBeerCard = this.addBeerCard.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.removeHandler = this.removeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    changeHandler(beer, changeType, event) {
        event.persist();
        this.setState(function(state, props) {
            var beerIndex = state.beers.findIndex((b) => {return b.id == beer.id})

            if (changeType == changeTypes.NAME) {
                state.beers[beerIndex].name = event.target.value
            }
            if (changeType == changeTypes.DESCRIPTION) {
                state.beers[beerIndex].description = event.target.value
            }
            if (changeType == changeTypes.PRICE) {
                var newNum = parseFloat(event.target.value)
                if (newNum) {
                    state.beers[beerIndex].price.current = newNum
                    state.beers[beerIndex].price.max = newNum
                    state.beers[beerIndex].price.min = newNum
                    state.beers[beerIndex].price.default = newNum
                }
            }
            if (changeType == changeTypes.QUANTITY) {
                var newNum = parseFloat(event.target.value)
                if (newNum) {
                    state.beers[beerIndex].quantity = newNum
                }
            }
            return state
        })
    }

    removeHandler(beer, changeType, event) {
        this.props.removeBeer(beer)
    }

    submitHandler(beer, changeType, event) {
        this.props.pushBeer(beer)
        this.forceUpdate()
    }

    generateCards() {
        console.log("ADMIN MENU generate cards", this.state.beers)
        var cards = this.state.beers.map((beer) => {
            return (
                <Card bg="light" md="4">
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group className="container-fluid" controlId="validationFormik01">
                                    <Form.Label>Beer Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="beerName"
                                        value={beer.name}
                                        onChange={(event) => this.changeHandler(beer, changeTypes.NAME, event)}
                                    //isValid={touched.firstName && !errors.firstName}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group className="container-fluid" controlId="validationFormik01">
                                    <Form.Label>Beer Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        name="description"
                                        value={beer.description}
                                        onChange={(event) => this.changeHandler(beer, changeTypes.DESCRIPTION, event)}
                                    //isValid={touched.firstName && !errors.firstName}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group className="container-fluid">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={beer.price.default}
                                        onChange={(event) => this.changeHandler(beer, changeTypes.PRICE, event)}
                                    //isValid={touched.firstName && !errors.firstName}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group className="container-fluid">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="qunatity"
                                        value={beer.quantity}
                                        onChange={(event) => this.changeHandler(beer, changeTypes.QUANTITY, event)}
                                    //isValid={touched.firstName && !errors.firstName}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group className="container-fluid">
                                    <Button variant="primary" onClick={() => this.submitHandler(beer)} block>Submit</Button>
                                </Form.Group>
                                <Form.Group className="container-fluid">
                                    <Button variant="danger" onClick={() => this.removeHandler(beer)} block>Remove</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
            )
        })

        cards.push((
            <Button variant="primary" block size="lg" onClick={this.addBeerCard}><h1>+</h1></Button>
        ))

        console.log("FF", cards)
        return (
            <CardColumns>
                {cards}
            </CardColumns>
        )
    }

    addBeerCard(event) {
        event.stopPropagation()
        this.setState((state) => {
            const defaultBeer = {
                id: v4(),
                name: "default beer",
                description: "default description",
                price: {
                    default: 0,
                    max: 0,
                    current: 0,
                    min: 0
                },
                quantity: 0
            }

            state.beers = state.beers.concat([defaultBeer])
            return state
        })
    }

    render() {
        return (
            <div className="">
                <div className="container p-5">
                    <div className="">
                        {this.generateCards()}
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminMenu