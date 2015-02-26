var React = require('react');
var ReactPropTypes = React.PropTypes;

var HighScore = React.createClass({

	propTypes: {
    	currentView: ReactPropTypes.string.isRequired
  	},
	render: function () {

		if(this.props.currentView != "HighScore"){
			return null;
		}

		return (
			<div className="row">
				<p>This page will view highscore</p>
			</div>
		);
	}
});

module.exports = HighScore;