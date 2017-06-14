import React, { Component } from 'react'

class GamePlayerScorer extends Component {
  onIncrementScore = (by = 1) => this.props.onIncrementScore(by)
  render() {
    return (
      <div>
        <p>{this.props.player.name}</p>
        <div className="btn-group btn-group-block">
          <button onClick={() => this.onIncrementScore(-1)} className="btn">-</button>
          <button onClick={() => this.onIncrementScore()} className="btn">+</button>
        </div>
      </div>
    )
  }
}

export default GamePlayerScorer
