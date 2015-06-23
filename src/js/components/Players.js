var React = require('react');
var Player = require('./Player');
var TournActions = require('../actions/TournActions');

var ENTER_KEY_CODE = 13;

var Players = React.createClass({
	getInitialState: function() {
		return {
			allPlayers: this.props.allPlayers || {},
			value: this.props.value || ''
		};
	},

	render: function () {
		var allPlayers = this.props.allPlayers;
		var players = [];

		for (var key in allPlayers) {
			players.push(<Player key={key} player={allPlayers[key]} />);
		}

		/*
		 * The generate key button, need to be atleast 4 ppl to make two team
		 */
		var genButton;
		if(Object.keys(allPlayers).length >= 4){
			genButton = <button 
							type="button" 
							className="btn btn-success" 
							onClick={this._onGenerateTeamClick}
						>Generate teams</button>
		} else {
			genButton = <button 
							type="button" 
							className="btn btn-success" 
							onClick={this._onGenerateTeamClick}
							disabled="disabled"
						>Generate teams</button>
		};

		if(players.length > 0){
			return (
				<div>
					<div className="panel panel-default">
						<div className="panel-heading">
							Add new player:
						</div>
						<div className="panel-body">
							<input
								className={this.props.className}
								placeholder="John Doe"
								onBlur={this._save}
								onChange={this._onChange}
								onKeyDown={this._onKeyDown}
								value={this.state.value}
								autoFocus={true}
								id="enterPlayer"
							></input>
							<div className="pull-right">{genButton}</div>
						</div>
					</div>
					<div className="panel panel-default">
						<div className="panel-heading">
							Current players:
						</div>
						<div className="panel-body">
							<ul>
								{players}
							</ul>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="panel panel-default">
					<div className="panel-heading">
						Add new player:
					</div>
					<div className="panel-body">
						<input
							className={this.props.className}
							placeholder="John Doe"
							onBlur={this._save}
							onChange={this._onChange}
							onKeyDown={this._onKeyDown}
							value={this.state.value}
							autoFocus={true}
							id="enterPlayer"
						></input>
						<div className="pull-right">{genButton}</div>
					</div>
				</div>	
			);
		}
	},

	_onGenerateTeamClick: function() {
		TournActions.generateTeams();
	},

	/**
	* Invokes the callback passed in as onSave, allowing this component to be
	* used in different ways.
	*/
	_save: function() {
		this._onSave(this.state.value);
		this.setState({
			value: ''
		});
	},

	_onSave: function() {
		TournActions.addPlayer(this.state.value);
	},

	_onChange: function(event) {
		this.setState({
			value: event.target.value
		});
	},

	_onKeyDown: function(event) {
		if (event.keyCode === ENTER_KEY_CODE) {
			this._save();
		}
	}
});

module.exports = Players;
