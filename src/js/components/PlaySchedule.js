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
			<div className="panel panel-default">
  				<div className="panel-heading">
    				<h3 className="panel-title">Turn {this.props.turnNumber}</h3>
  				</div>
  				<div className="panel-body">
    				{matches}
  				</div>
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
				<form className="form-inline">
					<div className="form-group">
						<label className="sr-only" for="homeScore">Score for home team</label>
						<input
							onChange={this._onChangeHome}
							value={this.state.home}
							className="form-control"
							id="homeScore"
							placeholder="Home"></input>
					</div>
					<span>{" vs "}</span> 
					<div className="form-group">
						<label className="sr-only" for="awayScore">Score for away team</label>
						<input
							onChange={this._onChangeAway}
							value={this.state.away}
							className="form-control"
							id="awayScore"
						placeholder="Away"></input>
					</div>
					<span>{" "}</span> 
					<button 
						type="button"
						className="btn btn-default"
						onClick={this._onSaveResult}
					>Save</button>
				</form>
			);
		}

		var teamHome = this.props.teams[this.props.match[0]].teamName || "Team " + this.props.match[0];
		var teamAway = this.props.teams[this.props.match[1]].teamName || "Team " + this.props.match[1];

		console.log("Home team: " + teamHome);

		return (
			<div onClick={this._onDoubleClick}>
				<p>{teamHome} vs {teamAway + " "} <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></p>
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