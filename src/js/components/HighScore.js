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

		var allTeams = this.props.teams;

		var localTeams = [];
		var scoreRows = [];

		for(var key in allTeams){
			localTeams.push(allTeams[key]);
			console.log(allTeams[key]);
		}

		var compare = function(a,b) {
  			if (a.score < b.score)
     			return -1;
  			if (a.score > b.score)
    			return 1;
  			return 0;
  		}

  		localTeams.sort(compare);
  		localTeams.reverse();
  		for(var i = 0; i < localTeams.length; i++){
  			scoreRows.push(<ScoreRow key={"row"+i} team={localTeams[i]} rowNumber={i} />);
  		}

		return (
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Team</th>
						<th>Score</th>
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
		return (
			<tr>
				<td>{this.props.rowNumber+1}</td>
				<td>Team #{team.id}</td>
				<td>{team.score}</td>
			</tr>
		);
	}
});

module.exports = HighScore;