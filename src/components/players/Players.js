import React, { Component } from 'react'

import { ref } from '../../config/constants'

class Players extends Component {
	constructor(props) {
		super(props)
		this.state = {
			players: [],
			isLoading: true
		}
	}
	componentDidMount() {
		this.playersListener = ref.child('users').on('value', (snapshot) => {
			let players = this.state.players
			snapshot.forEach((child) => {
				players.push(child.val())
			})
			this.setState({ isLoading: false, players: players })
		})
	}
	componentWillUnmount() {
		ref.off('value', this.playersListener)
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
