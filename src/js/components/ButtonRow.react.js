var React = require('react');
var TournActions = require('../actions/TournActions');

var ButtonRow = React.createClass({

	render: function () {
		return (
			<div className="row">
				<div className="btn-group btn-group-justified" role="group">
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-default" onClick={this._onTeamClick}>Teamsssss</button>
  					</div>
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-default" onClick={this._onHighScoreClick}>Schedule</button>
					</div>
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-default" onClick={this._onScoreBoardClick}>Scoreboard</button>
					</div>
				</div>
			</div>
		);
	},

	_onTeamClick: function(){
		TournActions.changeView("Teams");
	},

	_onHighScoreClick: function(){
		TournActions.changeView("Schedule");
	},

	_onScoreBoardClick: function(){
		TournActions.changeView("HighScore");
	},
});

module.exports = ButtonRow;