var React = require('react');
var Players = require('./Players');

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
			<div className="row">
				<Players allPlayers={this.props.players} />
			</div>
		);
	}
});

var TeamList = React.createClass({
	render: function (){
		var tempTeams = [];
		var allTeams = this.props.teams;

		for(var teamId in allTeams){
			tempTeams.push(<TeamRow key={teamId} team={allTeams[teamId]} />);
		}

		return (
			<div>
				{tempTeams}
			</div>
		);
	}
});

var TeamRow = React.createClass({
	render: function () {
		var team = this.props.team;
		return(
			<div>
				<h3>Team #{team.id}</h3>
				<p>Player 1: {team.player1.name}</p>
				<p>Player 2: {team.player2.name}</p>
			</div>
		);
	}
});

module.exports = Teams;