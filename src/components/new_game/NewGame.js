import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NewGame extends Component {
	render() {
		return (
			<div>
				<div className="float-right">
					<Link to="/games" className="btn btn-link">Cancel</Link>
				</div>

				<h4>New game</h4>

				<h5>Team A</h5>

				<div className="form-autocomplete">
				  <div className="form-autocomplete-input form-input">

				    <label className="chip">
				      Thor Odinson
				      <button className="btn btn-clear"></button>
				    </label>

						<label className="chip">
				      Thor Odinson
				      <button className="btn btn-clear"></button>
				    </label>

				    <input className="form-input" type="text" placeholder="typing here" />
				  </div>

				  <ul className="menu">
				    <li className="menu-item">
				      <a href="#">
				        <div className="tile tile-centered">
				          <div className="tile-content">Steve Rogers</div>
				        </div>
				      </a>
				    </li>
				  </ul>
				</div>

				<h5>Team B</h5>

				<div className="form-autocomplete">
				  <div className="form-autocomplete-input form-input">

				    <label className="chip">
				      Thor Odinson
				      <button className="btn btn-clear"></button>
				    </label>

				    <input className="form-input" type="text" placeholder="typing here" />
				  </div>

				  <ul className="menu">

				    <li className="menu-item">
				      <a href="#">
				        <div className="tile tile-centered">
				          <div className="tile-content">Steve Rogers</div>
				        </div>
				      </a>
				    </li>
				  </ul>
				</div>

			</div>
		)
	}
}

export default NewGame
