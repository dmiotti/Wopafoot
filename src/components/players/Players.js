import React, { Component } from 'react'
import { getPlayers } from '../../helpers/auth'

class Players extends Component {
	constructor(props) {
		super(props)
		this.state = {
			players: [],
			isLoading: true
		}
	}
	componentDidMount() {
		getPlayers().on('value', (snapshot) => {
			var players = []
			snapshot.forEach(function(childSnapshot) {
				players.push(childSnapshot.val());
	    });
			this.setState({ isLoading: false, players: players })
		})
	}
	render() {
		const { players, isLoading } = this.state
		return (
			<div>
				<h3>Players</h3>

				{isLoading && <div className="loading"></div>}
				{players.length > 0 &&
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>
							{players.map((player) =>
								<tr key={player.uid}><td>{player.name}</td></tr>
							)}
						</tbody>
					</table>
				}
			</div>
		)
	}
}

export default Players
