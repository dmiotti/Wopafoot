import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { ref } from '../../config/constants'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }
  componentDidMount() {
    let uid = this.props.match.params.uid
    this.gameRef = ref.child(`games/${uid}`)
    this.gameRef.on('value', this.onGameChanged)
  }
  componentWillUnmount() {
    this.gameRef.off('value', this.onGameChanged)
  }
  onGameChanged = (snapshot) => {
    let game = snapshot.val()
    this.setState({ isLoading: false, game: game })
  }
	incrementScore = (team, score, by = 1) => {
    let uid = this.state.game.uid
    let updates = { [`games/${uid}/${team}/score`]: score + by }
    ref.update(updates)
	}
  formatTeamPlayers = (p) => Object.keys(p).map((k) => p[k]).join(' & ')
  render() {
    const { isLoading, game } = this.state
    return (
      <div>
        {isLoading && <div className="loading"></div>}

        {game &&
          <div>
            <h5>{this.formatTeamPlayers(game.teamA.players)} – {this.formatTeamPlayers(game.teamB.players)}</h5>
            <p>Status: {game.status}</p>

            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Team A</th>
                  <th>Team B</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>Score: {game.teamA.score}</p>
                    <div className="btn-group btn-group-block">
                      <button onClick={() => this.incrementScore('teamA', game.teamA.score, -1)} className="btn">-</button>
                      <button onClick={() => this.incrementScore('teamA', game.teamA.score)} className="btn">+</button>
                    </div>
                  </td>
                  <td>
                    <p>Score: {game.teamB.score}</p>
                    <div className="btn-group btn-group-block">
                      <button onClick={() => this.incrementScore('teamB', game.teamB.score, -1)} className="btn">-</button>
                      <button onClick={() => this.incrementScore('teamB', game.teamB.score)} className="btn">+</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        }


        <hr />
        <Link to="/games" className="btn">Back</Link>

      </div>
    )
  }
}

export default Game
