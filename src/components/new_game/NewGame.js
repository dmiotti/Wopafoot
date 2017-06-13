import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { getPlayers, createGame } from '../../helpers/auth'

import TeamForm from './TeamForm'

class NewGame extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			players: [],
			teamA: [],
			teamB: [],
			error: '',
			shouldRedirect: false,
			isCreatingGame: false
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
			.then(() => this.setState({ shouldRedirect: true }))
			.catch((error) => this.setState({ error: error.message }))
	}
	toggleToast = () => {
		this.setState({ error: '' })
	}
	render() {
		const { isLoading, isCreatingGame, teamA, teamB, shouldRedirect, error } = this.state
		return (
			shouldRedirect ? <Redirect to="/games" /> :

			<div>
				<h4>New game</h4>
				{isLoading ?
					<div className="loading"></div> :

					<div>
						<form onSubmit={this.onSubmit}>

							{error &&
								<div className="toast toast-error">
									<button onClick={this.toggleToast} className="btn btn-clear float-right"></button>
									{error}
								</div>
							}

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
								<button className="btn btn-primary" disabled={isCreatingGame}>
									{isCreatingGame ? 'Creating...' : 'Create'}
								</button>
								<Link to="/games" className="btn btn-link" disabled={isCreatingGame}>Cancel</Link>
							</div>
						</form>
					</div>
				}
			</div>
		)
	}
}

export default NewGame
