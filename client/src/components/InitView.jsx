import React, { Component } from "react"
import { Card, Container, Form, Button, Col } from "react-bootstrap"

class InitView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableId: "",
            admin: false
        }

        this.inputHandler = this.inputHandler.bind(this)
        this.buttonHandler = this.buttonHandler.bind(this)
    }

    buttonHandler() {
        if (this.state.tableId.length == 0) {
            this.props.init({
                id: this.state.tableId,
                admin: true
            })
        } else {
            this.props.init({
                id: this.state.tableId,
                admin: false
            })
        }
    }

    inputHandler(event) {
        this.setState({
            tableId: event.target.value
        })
    }

    render() {
        return (
            <Container className="text-center">
                <Card className="justify-content-md-center h-100" md={2}>
                    <Card.Body>
                        <Card.Title>Init Device</Card.Title>
                        <Card.Text>
                            <Form.Group>
                                <Form.Row>
                                    <Form.Label column="lg" lg={2}>
                                        Table ID:
                                    </Form.Label>
                                    <Col>
                                        <Form.Control size="lg" type="text" placeholder="Inside-42" value={this.state.tableId} onChange={this.inputHandler} />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Button variant="primary" type="submit" size="lg" onClick={this.buttonHandler}>
                                        {this.state.tableId.length == 0 ? "As Bartender" : "As Table"}
                                    </Button>
                                </Form.Row>
                            </Form.Group>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>

                    </Card.Footer>
                </Card>

            </Container>
        )
    }
}

export default InitView