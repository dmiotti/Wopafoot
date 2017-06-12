import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { getPlayers, createGame } from '../../helpers/auth'

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
		currentTeam.push(player)
		this.setState({ [teamName]: currentTeam })
	}
	handleRemovePlayer(player, teamName) {
		let currentTeam = this.state[teamName]
		let index = currentTeam.indexOf(player)
		currentTeam.splice(index, 1)
		this.setState({ [teamName]: currentTeam })
	}
	remainingPlayers() {
		let teams = this.state.teamA.concat(this.state.teamB)
		return this.state.players.filter((player) => {
			return teams.indexOf(player) === -1
		})
	}
	onSubmit = (e) => {
		e.preventDefault()
		createGame(this.state.teamA, this.state.teamB)
	}
	render() {
		const { isLoading, teamA, teamB } = this.state
		return (
			<div>
				<h4>New game</h4>
				{isLoading ?
					<div className="loading"></div> :

					<div>
						<form>
							<div className="form-group">
								<TeamForm teamName="Team A"
									pool={this.remainingPlayers()}
									selectedPlayers={teamA}
									onAddPlayer={(player) => {this.handleAddPlayer(player, 'teamA')}}
									onRemovePlayer={(player) => {this.handleRemovePlayer(player, 'teamA')}}
									hasFocus={true}
									maxPlayers={2}
								/>
							</div>

							<div className="form-group">
								<TeamForm teamName="Team B"
									pool={this.remainingPlayers()}
									selectedPlayers={teamB}
									onAddPlayer={(player) => {this.handleAddPlayer(player, 'teamB')}}
									onRemovePlayer={(player) => {this.handleRemovePlayer(player, 'teamB')}}
									maxPlayers={2}
								/>
							</div>

							<div>
								<button onClick={this.onSubmit} className="btn btn-primary">Create</button>
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
