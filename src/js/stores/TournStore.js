var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TournConstants = require('../constants/TournConstants');
var assign = require('object-assign');
var robin = require('roundrobin');
var CHANGE_EVENT = 'change';

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

function loadFromLocal(){

	console.log("YOLO: " + localStorage.getItem("YOLO"));

	// _currentView = JSON.parse(localStorage.getItem("_currentView"));
	// _players = JSON.parse(localStorage.getItem("_players"));
	// _teams = JSON.parse(localStorage.getItem("_teams"));
	// _schedule = JSON.parse(localStorage.getItem("_schedule"));
	// _games = JSON.parse(localStorage.getItem("_games"));

	// if(_players == null){
	// 	_players = {};
	// }
	// if(_teams == null){
	// 	_teams = {};
	// }
	// if(_schedule == null){
	// 	_schedule = [];
	// }
	// if(_games == null){
	// 	_games = {};
	// }
	// localStorage.clear();
	// _currentView = "StartPage";
}

function cleanLocal(){
	localStorage.clear();
}

function saveToLocal(){
	localStorage.setItem("_currentView", JSON.stringify(_currentView));
	localStorage.setItem("_player", JSON.stringify(_players));
	localStorage.setItem("_teams", JSON.stringify(_teams));
	localStorage.setItem("_schedule", JSON.stringify(_schedule));
	localStorage.setItem("_games", JSON.stringify(_games));
}

function updateCurrentView(newView) {
	_currentView = newView;
	saveToLocal();
}

function addPlayer(playerName) {
	var nextId = Object.keys(_players).length + 1;
	_players[nextId] = { name: playerName, id: nextId };
	saveToLocal();
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
						id: teamIndex,
						score: 0
					};
		_teams[teamIndex] = team;
		teamIndex++;
	}

	generateSchedule();
}

function generateSchedule() {
	_schedule = robin(Object.keys(_teams).length);
	saveToLocal();
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

function addGameResult(id, homeGoal, awayGoal, homeTeam, awayTeam){
	var game = _games[id];
	if(game == undefined){
		game = {};
	}

	game.id = id;
	game.homeGoal = homeGoal;
	game.awayGoal = awayGoal;

	console.log("New game result");
	console.log(game);

	_games[id] = game;

	//Update the score for each team
	//home wins
	if(homeGoal > awayGoal){
		_teams[homeTeam].score = _teams[homeTeam].score + 2; 
	} 
	else if(homeGoal == awayGoal){
		_teams[homeTeam].score = _teams[homeTeam].score + 1;
		_teams[awayTeam].score = _teams[awayTeam].score + 1;
	} else {
		_teams[awayTeam].score = _teams[awayTeam].score + 2;
	}
	saveToLocal();
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

	loadData: function() {
		loadFromLocal();
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
			addGameResult(action.id,action.home,action.away,action.homeTeam,action.awayTeam);
			TournStore.emitChange();
			break;
		default:
	}
});

module.exports = TournStore;