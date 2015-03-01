var React = require('react');

var StartPage = React.createClass({
	render: function() {

		if(this.props.currentView != "Home"){
			return null;
		}

		return (
			<div>
				<div className="page-header">
	  				<h1>Tournament <small>by Failkidz</small></h1>
				</div>
				<div>
					<p>Simple torunamt web app for 2 player teams. Minimum is 4 players.</p>
					<h3>Data</h3>
					<p>All the game data i stored locally in your browser(local storage). 
					Until you clear out your browser or use the button below the data will be saved. Even if you close this page.</p>

					<h3>Source code</h3>
					<p>Source code avaible at <a href="http://github.com/failkidz/tournament">Github</a></p>
				</div>
			</div>
		);
	}
});

module.exports = StartPage;