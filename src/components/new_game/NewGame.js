import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getPlayers } from '../../helpers/auth'

import TeamForm from './TeamForm'

class NewGame extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			players: [],
			teamA: [],
			teamB: []
		}
	}
	componentDidMount() {
		getPlayers().on('value', (snapshot) => {
			let players = []
			snapshot.forEach(function(childSnapshot) {
				players.push(childSnapshot.val());
	    });
			this.setState({ isLoading: false, players: players })
		})
	}
	handleAddPlayer(player, teamName) {
		let currentTeam = this.state[teamName]
		if (currentTeam.indexOf(player) !== -1) {
			return;
		}
		currentTeam.push(player)
		this.setState({ [teamName]: currentTeam })
	}
	handleRemovePlayer(player, teamName) {
		let currentTeam = this.state[teamName]
		if (currentTeam.indexOf(player) === -1) {
			return;
		}
		currentTeam.push(player)
		this.setState({ [teamName]: currentTeam })
	}
	render() {
		const { isLoading, players, teamA, teamB } = this.state
		return (
			<div>
				<h4>New game</h4>
				{isLoading ?
					<div className="loading"></div> :
					<div>
						<form>
							<div className="form-group">
								<TeamForm teamName="Team A"
									pool={players}
									selectedPlayers={teamA}
									onAddPlayer={(player) => {this.handleAddPlayer(player, 'teamA')}}
									onRemovePlayer={(player) => {this.handleRemovePlayer(player, 'teamA')}}
								/>
							</div>

							<div className="form-group">
								<TeamForm teamName="Team B"
									pool={players}
									selectedPlayers={teamB}
									onAddPlayer={(player) => {this.handleAddPlayer(player, 'teamB')}}
									onRemovePlayer={(player) => {this.handleRemovePlayer(player, 'teamB')}}
								/>
							</div>

							<div>
								<button className="btn btn-primary">Create</button>
								<Link to="/games" className="btn btn-link">Cancel</Link>
							</div>
						</form>
					</div>
				}
			</div>
		)
	}
}

export default NewGame
