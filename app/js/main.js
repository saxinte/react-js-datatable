var React = require('react');
var CreatePlayerButton = require('./components/CreatePlayerButton.jsx');
var Table = require('./components/Table.jsx');

React.render(<CreatePlayerButton/>, document.getElementById('createPlayerButton'));
React.render(<Table/>, document.getElementById('table'));