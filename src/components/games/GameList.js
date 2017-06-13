import React, { Component } from 'react'

class GameList extends Component {
  formatTeamPlayers(players) {
    return Object.keys(players).map((key) => players[key]).join(' & ')
  }
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
            </tr>
          </thead>
          <tbody>
            {games.map((game) =>
              <tr key={game.uid}>
                <td>{this.formatTeamPlayers(game.teamA.players)}</td>
                <td>{this.formatTeamPlayers(game.teamB.players)}</td>
                <td>{game.teamA.points}/{game.teamB.points}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default GameList
