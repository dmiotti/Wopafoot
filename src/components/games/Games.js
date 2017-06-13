import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { ref } from '../../config/constants'

import GameList from './GameList'

import './Game.css'

class Games extends Component {
	constructor(props) {
		super(props)
		this.state = { playing: [], finished: [] }
	}
	componentDidMount() {
		this.gamesListener = ref.child('games').on('child_added', (snapshot) => {
			let playing = this.state.playing
			playing.push(snapshot.val())
			this.setState({ playing: playing })
		})
	}
	componentWillUnmount() {
		ref.off('child_added', this.gamesListener)
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
