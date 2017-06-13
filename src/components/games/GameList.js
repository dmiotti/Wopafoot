import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class GameList extends Component {
  formatTeamPlayers = (p) => Object.keys(p).map((k) => p[k]).join(' & ')
  render() {
    const { name, games } = this.props
    return (
      <div>
        <h5>{name}</h5>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Team A</th>
              <th>Team B</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) =>
              <tr key={game.uid}>
                <td>{this.formatTeamPlayers(game.teamA.players)}</td>
                <td>{this.formatTeamPlayers(game.teamB.players)}</td>
                <td>{game.teamA.points}/{game.teamB.points}</td>
                <td><Link to={'/games/' + game.uid} className="btn btn-link">View</Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default GameList
