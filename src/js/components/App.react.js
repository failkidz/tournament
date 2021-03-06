var React = require('react');
var TournStore = require('../stores/TournStore');

var StartPage = require('./StartPage');
var ButtonRow = require('./ButtonRow.react');
var Teams = require('./Teams');
var HighScore = require('./HighScore');
var PlaySchedule = require('./PlaySchedule');

//Get the current state from the store
function getTournState() {
	return {
    	currentView: TournStore.getCurrentView(),
    	players: TournStore.getPlayers(),
    	teams: TournStore.getTeams(),
    	schedule: TournStore.getSchedule(),
    	games: TournStore.getGames(),
    	highscore: TournStore.getHighScore()
	};
}

var App = React.createClass({

	getInitialState: function() {
		TournStore.loadData();
		return getTournState();
	},

	componentDidMount: function() {
		TournStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		TournStore.removeChangeListener(this._onChange);
	},

	render: function() {

		return (
			<div>
        		<ButtonRow 
					currentView={this.state.currentView} />
        		<StartPage 
        			currentView={this.state.currentView} />
	        	<Teams 
	        		currentView={this.state.currentView}
	        		players = {this.state.players}
	        		teams = {this.state.teams} />
	        	<PlaySchedule
	        		currentView={this.state.currentView}
	        		schedule={this.state.schedule}
	        		games={this.state.games} 
	        		teams={this.state.teams} />
        		<HighScore 
        			currentView={this.state.currentView} 
        			teams={this.state.teams}
        			highscore={this.state.highscore} />
      		</div>
  		);
	},

	/*
   	 * Event handler for 'change' events coming from the TournStore
     */
	_onChange: function() {
    	this.setState(getTournState());
  	}
});

module.exports = App;