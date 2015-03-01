var React = require('react');
var TournActions = require('../actions/TournActions');

var PlaySchedule = React.createClass({

	render: function () {

		if(this.props.currentView != "Schedule"){
			return null;
		}

		var allTurns = this.props.schedule;
		var turns = [];

		if(allTurns.length < 1){
			return (
				<div className="panel panel-default">
					<div className="panel-body">
						Need to create teams first before a schedule is created
					</div>
				</div>
			);
		}

		for(var i = 0; i < allTurns.length; i++){
			var newKey = "t"+i;
			turns.push(<PlayTurn myKey={newKey} turn={allTurns[i]} turnNumber={i+1} games={this.props.games} teams={this.props.teams} />);
		}

		return (
			<div>
				{turns}
			</div>
		);
	}
});

var PlayTurn = React.createClass({
	render: function (){

		allMatches = this.props.turn;
		matches = [];

		for(var i = 0; i < allMatches.length; i++){
			var newKey = this.props.myKey+"-"+i;
			matches.push(<Turn key={newKey} myKey={newKey} match={allMatches[i]} games={this.props.games} teams={this.props.teams} />);
		}

		return(
			<div>
				<h2>Turn {this.props.turnNumber}</h2>
				{matches}
			</div>
		);
	}
});

var Turn = React.createClass({

	getInitialState: function() {

		this.props.game = this.props.games[this.props.myKey];

		if(this.props.game == undefined){
			this.props.game = {};
		}

		return {
			isEditing: false,
			homeTeam: this.props.match[0],
			awayTeam: this.props.match[1],
			away: this.props.game.awayGoal || 0,
			home: this.props.game.homeGoal || 0
		};
	},

	render: function (){

		if(this.state.isEditing){
			return (
				<div>
					<input
						onChange={this._onChangeHome}
						value={this.state.home}
					></input>
					<span>vs</span>
					<input
						onChange={this._onChangeAway}
						value={this.state.away}
					></input>
					<button 
						type="button" 
						className="btn btn-default" 
						onClick={this._onSaveResult}
					>Save</button>
				</div>
			);
		}

		var teamHome = this.props.teams[this.props.match[0]].teamName || "Team " + this.props.match[0];
		var teamAway = this.props.teams[this.props.match[1]].teamName || "Team " + this.props.match[1];

		console.log("Home team: " + teamHome);

		return (
			<div>
				<p onDoubleClick={this._onDoubleClick}>{teamHome} vs {teamAway}</p>
			</div>
		);
	},

	_onSaveResult: function(){
		TournActions.saveGameResult(this.props.myKey,this.state.home,this.state.away,this.state.homeTeam,this.state.awayTeam);
		this.setState({isEditing: false});
	},

	_onDoubleClick: function() {
		this.setState({isEditing: true});
	},

	_onChangeAway: function(event) {
		this.setState({
			away: event.target.value
		});
	},

	_onChangeHome: function(event) {
		this.setState({
			home: event.target.value
		});
	}
});

module.exports = PlaySchedule;