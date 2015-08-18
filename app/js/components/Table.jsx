var React = require('react');
var Cell  = require('./Cell.jsx');
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
                            <Cell content={gamer.id} />
                            <Cell content={gamer.nickname} />
                            <Cell content={gamer.role} />
                            <Cell content={gamer.age} />
                        </tr>
                    )
                })}

            </table>
        )
    }

});

module.exports = Table;