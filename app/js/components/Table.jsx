var React = require('react');
var Row   = require('./Row.jsx');
var datas = require('../datas/datas.js');
var MainDispatcher = require('../dispatchers/AppDispatcher.js');

var Table = React.createClass({

    getInitialState: function() {

        // Init variables
        var gamers = datas.slice(0);
        this.count = 0;

        // Generate unique ID for each gamer
        gamers.forEach(function(gamer) {
            gamer.id = this.createUniqueID();
        }.bind(this));

        return {
            gamers: gamers
        }
    },

    createUniqueID: function() {
        return this.count += 1;
    },

    updateState: function() {
        this.setState({
            'gamers': this.state.gamers
        });
    },

    addGamer: function(gamerObj) {
        gamerObj.id = this.createUniqueID();
        this.state.gamers.push(gamerObj);
        this.updateState();
    },

    deleteGamer: function(gamer) {
        var found = this.state.gamers.indexOf(gamer);
        if(found !== -1){
            this.state.gamers.splice(found, 1);
            this.updateState();
        }
    },

    componentDidMount: function() {
        MainDispatcher.on('createPlayer', this.addGamer);
    },

    componentWillUnmount: function() {
        MainDispatcher.removeListener('createPlayer', this.addGamer);
    },

    render: function() {
        var that = this;
        return (
            <table className="table table-striped table-bordered"> 
                <tbody>

                    <tr>
                        <th className="th1"></th>
                        <th className="th2">Nickname</th>
                        <th className="th3">Role</th>
                        <th className="th4">Age</th>
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