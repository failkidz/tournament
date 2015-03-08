var React = require('react');
var ReactPropTypes = React.PropTypes;

var HighScore = React.createClass({

	render: function () {

		if(this.props.currentView != "HighScore"){
			return null;
		}

		if(Object.keys(this.props.teams).length <= 0){
			return (
				<div className="panel panel-default">
					<div className="panel-body">
						Crete teams and play matches before viewing highscore.
					</div>
				</div>
			);			
		}

		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<ScoreTable key={"scorelist"} teams={this.props.teams} />
				</div>
			</div>
		);
	}
});

var ScoreTable = React.createClass({
	render: function(){

		var allHighscore = this.props.highscore;
		var localTeams = this.props.teams;

		var localScoreRows = [];
		var scoreRows = [];

		for(var key in allHighscore){
			localScoreRows.push(allHighscore[key]);
		}

		var compare = function(a,b) {
  			if (a.points < b.points)
     			return -1;
  			if (a.points > b.points)
    			return 1;
  			return 0;
  		}

  		localScoreRows.sort(compare);
  		localScoreRows.reverse();
  		for(var i = 0; i < localScoreRows.length; i++){
  			scoreRows.push(<ScoreRow key={"row"+i} team={localTeams[i]} highscore={localScoreRows[i]} rowNumber={i} />);
  		}

		return (
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Team</th>
						<th>Played</th>
						<th>Won</th>
						<th>Drawn</th>
						<th>Lost</th>
						<th>For</th>
						<th>Against</th>
						<th>+/-</th>
						<th>Points</th>
					</tr>
				</thead>
				<tbody>
					{scoreRows}
				</tbody>
			</table>
		);
	}
});

var ScoreRow = React.createClass({
	render: function() {
		var team = this.props.team;
		var hs = this.props.highscore;

		var teamName = team.teamName || "Team #"+team.id;

		return (
			<tr>
				<td>{this.props.rowNumber+1}</td>
				<td>{hs.teamName}</td>
				<th>{hs.played}</th>
				<th>{hs.won}</th>
				<th>{hs.drawn}</th>
				<th>{hs.lost}</th>
				<th>{hs.goalMade}</th>
				<th>{hs.goalLetIn}</th>
				<th>{hs.goalDiff}</th>
				<td>{hs.points}</td>
			</tr>
		);
	}
});

module.exports = HighScore;