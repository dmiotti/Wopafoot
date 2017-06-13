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
    this.gameListener = ref.child(`games/${uid}`).on('value', (snapshot) => {
      let game = snapshot.val()
      console.log(game)
      this.setState({ isLoading: false, game: game })
    })
  }
  componentWillUnmount() {
    ref.off('value', this.gameListener)
  }
  render() {
    const { isLoading, game } = this.state
    return (
      <div>
        {isLoading && <div className="loading"></div>}

        {game &&
          <div>
            <p>Status: {game.status}</p>
          </div>
        }

        <Link to="/games" className="btn">Back</Link>

      </div>
    )
  }
}

export default Game
