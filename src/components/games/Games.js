import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Games extends Component {
	render() {
		return (
			<div>
				<div className="float-right">
					<Link to="/games/new" className="btn">New game</Link>
				</div>

				<h4>Games</h4>
				<h5>Playing now</h5>
				<h5>Finished</h5>
			</div>
		)
	}
}

export default Games
