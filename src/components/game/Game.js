import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { ref } from '../../config/constants'

import GamePlayerScorer from './GamePlayerScorer'

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
	incrementScore = (teamName, teamScore, player, by) => {
    let gameUid = this.state.game.uid
    ref.update({
      [`games/${gameUid}/${teamName}/score`]: teamScore + by,
      [`games/${gameUid}/${teamName}/players/${player.uid}/score`]: player.score + by
    })
	}
  playersForTeam = (team) => {
    return Object.keys(team.players).map(k => (
      {uid: k, name: team.players[k].name, score: team.players[k].score}
    ))
  }
  formatTeamPlayers = (p) => Object.keys(p).map(k => p[k].name).join(' & ')
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
                    {this.playersForTeam(game.teamA).map(player => {
                      return <GamePlayerScorer
                        key={player.uid}
                        player={player}
                        onIncrementScore={(by) =>
                          this.incrementScore('teamA', game.teamA.score, player, by)
                        } />
                    })}
                  </td>
                  <td>
                    <p>Score: {game.teamB.score}</p>
                    {this.playersForTeam(game.teamB).map(player => {
                      return <GamePlayerScorer
                        key={player.uid}
                        player={player}
                        onIncrementScore={(by) =>
                          this.incrementScore('teamB', game.teamB.score, player, by)
                        } />
                    })}
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
