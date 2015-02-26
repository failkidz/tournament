var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TournConstants = require('../constants/TournConstants');
var assign = require('object-assign');

var robin = require('roundrobin');

var CHANGE_EVENT = 'change';

var _todos = {};

//Set the default view to team
var _currentView = "";
//Players
var _players = {};
//Teams
var _teams = {};
//Schedule for the matches
var _schedule = [];
//Game result 
var _games = {};

function updateCurrentView(newView) {
	_currentView = newView;
}

function addPlayer(playerName) {
	var nextId = Object.keys(_players).length + 1;
	_players[nextId] = { name: playerName, id: nextId };
}

function generateTeams(){
	var players = []

	for(var key in _players){
		players.push(_players[key]);
	}


	if((players.length & 1 ) != 0 ){
		var nextId = players.length + 1;
		players.push({name: "Guest player", id: nextId});
	}

	shuffle(players);

	var index = 0;
	var teamIndex = 1;
	for(var player in players){
		if(index >= players.length){
			break;
		}
		var team = {
						player1: players[index++],
						player2: players[index++],
						id: teamIndex
					};
		_teams[teamIndex] = team;
		teamIndex++;
	}

	generateSchedule();
}

function generateSchedule() {
	_schedule = robin(Object.keys(_teams).length);

	console.log(JSON.stringify(_schedule,2));
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function addGameResult(id, homeGoal, awayGoal){
	var game = _games[id];
	if(game == undefined){
		game = {};
	}

	game.id = id;
	game.homeGoal = homeGoal;
	game.awayGoal = awayGoal;

	console.log("Nre game result");
	console.log(game);

	_games[id] = game;
}


var TournStore = assign({}, EventEmitter.prototype, {

	getCurrentView: function() {
		return _currentView;
	},

	getPlayers: function() {
		return _players;
	},

	getTeams: function() {
		return _teams;
	},

	getSchedule: function() {
		return _schedule;
	},

	getGames: function() {
		return _games;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	* @param {function} callback
	*/
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
	var text;
	var view;
	var player;

	switch(action.actionType) {
		case TournConstants.TOURN_CHANGE_VIEW:
			view = action.view;
			updateCurrentView(view);
			TournStore.emitChange();
			break;
		case TournConstants.TOURN_ADD_PLAYER:
			player = action.player.trim();
			if (player !== ''){
				addPlayer(player);
			}
			TournStore.emitChange();
			break;
		case TournConstants.TOURN_GENERATE_TEAMS:
			generateTeams();
			TournStore.emitChange();
			break;
		case TournConstants.TOURN_GAME_RESULT:
			addGameResult(action.id,action.home,action.away)
			TournStore.emitChange();
			break;
		default:
	}
});

module.exports = TournStore;