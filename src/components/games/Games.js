import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Games extends Component {
	render() {
		return (
			<div>
				<div className="float-right">
					<Link to="/games/new" className="btn">New game</Link>
				</div>

				<h4>Upcoming matches</h4>

				<h4>Past matches</h4>

			</div>
		)
	}
}

export default Games
