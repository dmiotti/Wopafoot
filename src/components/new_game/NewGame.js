import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NewGame extends Component {
	render() {
		return (
			<div>
				<div className="float-right">
					<Link to="/games" className="btn btn-link">Cancel</Link>
				</div>

				<h4>Here create a new game</h4>
			</div>
		)
	}
}

export default NewGame
