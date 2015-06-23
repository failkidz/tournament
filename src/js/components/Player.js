var React = require('react');

var Player = React.createClass({
	render: function() {
		var player = this.props.player;

		return (
			<li key={player.id}>
				{player.name}
			</li>
		);
	}
});

module.exports = Player;
