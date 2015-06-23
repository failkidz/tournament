var React = require('react');
var Players = require('./Players');
var TournActions = require('../actions/TournActions');

var Teams = React.createClass({
	render: function () {

		if(this.props.currentView !== "Teams"){
			return null;
		}

		//If we have teams set we should display them instead
		if(Object.keys(this.props.teams).length > 0){
			return (
				<TeamList teams={this.props.teams} />
			);
		}

		return (
			<Players allPlayers={this.props.players} />
		);
	}
});

var TeamList = React.createClass({
	render: function (){
		var tempTeams = [];
		var allTeams = this.props.teams;

		for(var teamId in allTeams){
			tempTeams.push(<TeamRow key={teamId} myKey={teamId} team={allTeams[teamId]} />);
		}

		return (
			<div>
				{tempTeams}
			</div>
		);
	}
});

var TeamRow = React.createClass({
	getInitialState: function() {
		return {
			isEditing: false,
			teamName: this.props.team.teamName || "Team #"+this.props.team.id
		};
	},

	render: function () {
		var team = this.props.team;

		if(this.state.isEditing){
			return(
				<div className="panel panel-default">
					<div className="panel-heading" onClick={this._onSaveTeam}>
						<input
							onChange={this._onChangeTeam}
							value={this.state.teamName}
						></input>
						<button
							type="button"
							className="btn btn-default"
							onClick={this._onSaveTeam}
						>Save</button>
					</div>
					<div className="panel-body">
						<p>Player 1: {team.player1.name}</p>
						<p>Player 2: {team.player2.name}</p>
					</div>
				</div>
			);
		}

		return(
			<div className="panel panel-default">
				<div className="panel-heading" onClick={this._onClickTeam}>
					{this.state.teamName+" "} 
					<span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
				</div>
				<div className="panel-body">
					<p>Player 1: {team.player1.name}</p>
					<p>Player 2: {team.player2.name}</p>
				</div>
			</div>
		);
	},

	_onSaveTeam: function(){
		TournActions.saveTeamName(this.props.myKey, this.state.teamName);
		this.setState({isEditing:false});
	},

	_onChangeTeam: function(event){
		this.setState({
			teamName: event.target.value
		});
	},

	_onClickTeam: function() {
		this.setState({isEditing: true});
	}
});

module.exports = Teams;
