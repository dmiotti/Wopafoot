import React, { Component } from 'react'

class TeamForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matched: [],
      players: this.props.selectedPlayers,
      search: ''
    }
  }
  componentDidMount() {
    this.nameInput.focus()
  }
  addPlayer = (player) => {
    let matches = this.props.pool.filter((p) => p.uid === player.uid)
    if (matches.length > 0) {
      this.props.onAddPlayer(matched[0])
    }
  }
  removePlayer = (player) => {
    let currentPlayers = this.state.players
    let index = currentPlayers.indexOf(player)
    if (index >= 0) {
      currentPlayers.splice(index, 1)
      this.setState({ players: currentPlayers, search: '' })
      this.props.onTeamChange(currentPlayers)
      this.nameInput.focus()
    }
  }
  onChange = (e) => {
    let pattern = e.target.value
    let reg = new RegExp(pattern.split('').join('\\w*').replace(/\W/, ""), 'i');
    let matched = []
    if (pattern) {
      matched = this.props.pool.filter((player) => {
        if (this.state.players.indexOf(player) < 0 && player.nickname.match(reg)) {
            return player;
        }
      });
    }
    this.setState({ matched: matched, search: pattern })
  }
  render() {
    const { teamName, pool } = this.props
    const { matched, players, search } = this.state
    return (
      <div>
  			<h5>{this.props.teamName}</h5>

  			<div className="form-autocomplete">
  			  <div className="form-autocomplete-input form-input">
  					{players.map(player =>
  						<label className="chip" key={player.uid}>
  				      {player.nickname}
  				      <button onClick={(e) => {e.preventDefault(); this.removePlayer(player);}} className="btn btn-clear"></button>
  				    </label>
  					)}
  			    <input ref={(input) => { this.nameInput = input; }}
              onChange={this.onChange}
              value={search}
              className="form-input"
              type="text"
              placeholder="Player nickname" />
  			  </div>

          {matched.length > 0 &&
    			  <ul className="menu">
              {matched.map(player =>
      			    <li onClick={() => this.addPlayer(player)} className="menu-item" key={player.uid}>
    			        <div className="tile tile-centered">
  									<div className="tile-content">{player.nickname}</div>
    			        </div>
      			    </li>
              )}
    			  </ul>}
  			</div>
      </div>
    )
  }
}

export default TeamForm
