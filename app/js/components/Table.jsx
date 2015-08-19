var React = require('react');
var Row   = require('./Row.jsx');
var datas = require('../datas/datas.js');

var Table = React.createClass({

    getInitialState: function() {
        return {
            gamers: datas.slice(0)
        }
    },

    deleteGamer: function(gamer) {
        var found = this.state.gamers.indexOf(gamer);
        if(found !== -1){
            this.state.gamers.splice(found, 1);
            this.setState({
                'gamers': this.state.gamers
            });
        }
    },

    render: function() {
        var that = this;
        return (
            <table className="table table-striped table-bordered"> 
                <tbody>

                    <tr>
                        <th className="th1"></th>
                        <th className="th2 center-text">ID</th>
                        <th className="th3">Nickname</th>
                        <th className="th4">Role</th>
                        <th className="th5">Age</th>
                    </tr>

                    {this.state.gamers.map(function(gamer) {
                        return (
                            <Row key={gamer.id} gamerObject={gamer} deleteGamer={that.deleteGamer.bind(null, gamer)} />
                        )
                    })}

                 </tbody>
            </table>
        )
    }

});

module.exports = Table;