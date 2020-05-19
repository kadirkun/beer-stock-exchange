import React, { Component } from "react"
import MenuItem from "./MenuItem"

class Menu extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    card_create(card) {
        return (
            <div className="col mb-4">
                {card}
            </div>
        )
    }

    render() {
        return (
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3">
                        {this.props.beers.map((beer) => (
                            this.card_create(<MenuItem beer={beer} addBeer={this.props.addBeer}/>)
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu