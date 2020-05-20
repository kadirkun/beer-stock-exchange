import React, { Component } from "react"
import {CardColumns} from "react-bootstrap"
import MenuItem from "./MenuItem"

class Menu extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    card_create(card) {
        return (
            <>
                {card}
            </>
        )
    }

    render() {
        return (
            <div className="">
                <div className="container">
                    <CardColumns className="p-5">
                        {this.props.beers.map((beer) => (
                            this.card_create(<MenuItem beer={beer} orderList={this.props.orderList} addBeer={this.props.addBeer}/>)
                        ))}
                    </CardColumns>
                </div>
            </div>
        )
    }
}

export default Menu