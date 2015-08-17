var React = require('react');
var datas = require('../datas/datas.js');

var Table = React.createClass({

	getInitialState: function() {
		return {
			gamers: datas.slice(0)
		}
	},

    render: function() {
        return (
            <table className="table table-striped table-bordered">

            	<tr>
					<th>ID</th>
					<th>Nickname</th>
					<th>Role</th>
					<th>Age</th>
				</tr>

				{this.state.gamers.map(function(gamer) {
					return (
						<tr>
							<td>{gamer.id}</td>
							<td>{gamer.nickname}</td>
							<td>{gamer.role}</td>
							<td>{gamer.age}</td>
						</tr>
					)
				})}

            </table>
        )
    }

});

module.exports = Table;