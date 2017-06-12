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
    if (this.props.hasFocus) {
      this.takeFocus()
    }
  }
  addPlayer = (player) => {
    this.props.onAddPlayer(player)
    this.clearSearch()
  }
  removePlayer = (player) => {
    this.props.onRemovePlayer(player)
    this.clearSearch()
  }
  clearSearch() {
    this.setState({ search: '', matched: [] })
    this.takeFocus()
  }
  takeFocus() {
    this.nameInput.focus()
  }
  onChange = (e) => {
    let pattern = e.target.value
    let reg = new RegExp(pattern.split('').join('\\w*').replace(/\W/, ""), 'i');
    let matched = []
    if (pattern) {
      matched = this.props.pool.filter((player) => {
        return this.state.players.indexOf(player) < 0 && player.nickname.match(reg)
      });
    }
    this.setState({ matched: matched, search: pattern })
  }
  render() {
    const { teamName, maxPlayers } = this.props
    const { matched, players, search } = this.state
    return (
      <div>
  			<h5>{teamName}</h5>

  			<div className="form-autocomplete">
  			  <div className="form-autocomplete-input form-input">

  					{players.map(player =>
  						<label className="chip" key={player.uid}>
  				      {player.nickname}
  				      <button
                  onClick={(e) => {e.preventDefault(); this.removePlayer(player);}}
                  className="btn btn-clear"></button>
  				    </label>
  					)}

  			    <input ref={(input) => { this.nameInput = input; }}
              onChange={this.onChange}
              value={search}
              className="form-input"
              type="text"
              placeholder="Player nickname" disabled={players.length >= maxPlayers} />
  			  </div>

          {matched.length > 0 &&
    			  <ul className="menu">

              {matched.map(player =>
      			    <li onClick={() => this.addPlayer(player)}
                  className="menu-item"
                  key={player.uid}>

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
