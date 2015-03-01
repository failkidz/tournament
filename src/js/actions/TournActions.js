var AppDispatcher = require('../dispatcher/AppDispatcher');
var TournConstants = require('../constants/TournConstants');

var TournActions = {
	changeView: function(newView) {
		AppDispatcher.dispatch({
			actionType: TournConstants.TOURN_CHANGE_VIEW,
			view: newView
		});
	},

	addPlayer: function(playerName) {
		AppDispatcher.dispatch({
			actionType: TournConstants.TOURN_ADD_PLAYER,
			player: playerName
		});
	},

	generateTeams: function() {
		AppDispatcher.dispatch({
			actionType: TournConstants.TOURN_GENERATE_TEAMS
		});
	},

	saveGameResult: function(id,home,away,homeTeam,awayTeam){
		AppDispatcher.dispatch({
			actionType: TournConstants.TOURN_GAME_RESULT,
			id: id,
			home: home,
			away: away,
			homeTeam: homeTeam,
			awayTeam:awayTeam,
		});
	},

	saveTeamName: function(teamId, newTeamName){
		AppDispatcher.dispatch({
			actionType: TournConstants.TOURN_SET_TEAMNAME,
			teamId: teamId,
			teamName: newTeamName
		});
	}
};

module.exports = TournActions;