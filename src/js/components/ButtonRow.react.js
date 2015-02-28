var React = require('react');
var TournActions = require('../actions/TournActions');

var ButtonRow = React.createClass({

	render: function () {

		return (
			<nav className="navbar navbar-default">
  				<div className="container-fluid">
  					<div className="navbar-header">
  						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
  							<span className="sr-only">Toggle navigation</span>
						    <span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" onClick={this._onHomeClick}>FKZ - Tournament</a>
  					</div>

					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							<li><a onClick={this._onTeamClick}>Teams</a></li>
							<li><a onClick={this._onHighScoreClick}>Schedule</a></li>
							<li><a onClick={this._onScoreBoardClick}>Scoreboard</a></li>
						</ul>
					</div>
  				</div>
  			</nav>
		);
	},

	_onHomeClick: function(){
		TournActions.changeView("Home");
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