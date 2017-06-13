import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { ref } from '../../config/constants'

import GameList from './GameList'

import './Games.css'

class Games extends Component {
	constructor(props) {
		super(props)
		this.state = { playing: [], finished: [] }
	}
	componentDidMount() {
		this.gamesRef = ref.child('games').orderByChild('timestamp')
		this.gamesRef.on('value', this.onGamesChanged)
	}
	componentWillUnmount() {
		this.gamesRef.off('value', this.onGamesChanged)
	}
	onGamesChanged = (snapshot) => {
		let playing = this.state.playing
		let finished = this.state.finished
		snapshot.forEach((child) => {
			let game = child.val()
			switch (game.status) {
				case 'finished':
					finished = [game, ...finished]
					break
				case 'playing':
					playing = [game, ...playing]
					break
				default:
					break
			}
			this.setState({ playing: playing, finished: finished })
		})
	}
	render() {
		const { playing, finished } = this.state
		return (
			<div>
				<div className="float-right">
					<Link to="/games/new" className="btn">New game</Link>
				</div>

				<h4>Games</h4>

				{playing.length > 0 &&
					<div className="game-list">
						<GameList name="Playing Now" games={playing} />
					</div>
				}

				{finished.length > 0 &&
					<div className="game-list">
						<GameList name="Finished" games={finished} />
					</div>
				}
			</div>
		)
	}
}

export default Games
