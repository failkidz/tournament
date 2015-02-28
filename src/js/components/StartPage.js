var React = require('react');

var StartPage = React.createClass({
	render: function() {

		if(this.props.currentView != "Home"){
			return null;
		}

		// return (
		// 	<h1>StartPag</h1>
		// );

		return (
			<div className="page-header">
  				<h1>Example page header
  					<small>
  						Subtext for header
  					</small>
  				</h1>
			</div>
		);
	}
});

module.exports = StartPage;