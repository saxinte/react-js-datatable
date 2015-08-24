var React = require('react');
var _     = require('underscore');
var Row   = require('./Row.jsx');
var datas = require('../datas/datas.js');
var MainDispatcher = require('../dispatchers/AppDispatcher.js');

var Table = React.createClass({

    getInitialState: function() {

        // Init variables
        var gamers = this.deepClone(datas);
        this.count = 0;

        // Generate unique ID for each gamer
        gamers.forEach(function(gamer) {
            gamer.id = this.createUniqueID();
        }.bind(this));

        return {
            gamers: gamers
        }

    },

    updateState: function() {
        this.setState({
            'gamers': this.state.gamers
        });
    },

    deepClone: function(array) {
        return array.map(function(obj) {
            return _.clone(obj);
        });
    },

    createUniqueID: function() {
        return this.count += 1;
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

    sortColumn: function(filterBy) {

        var reverseSort = this[filterBy] ? false : true;

        this.state.gamers.sort(function(a, b) {
            if(a[filterBy] > b[filterBy]){
                return reverseSort ? 1 : -1;
            }
            if(a[filterBy] < b[filterBy]){
                return reverseSort ? -1 : 1;
            }
            return 0;
        });

        // Store sort information
        this[filterBy] = reverseSort;
        
        this.updateState();
    },

    onCellChange: function(value, type, gamer) {
        var gamerIndex = this.state.gamers.indexOf(gamer);
        if(gamerIndex !== -1){
            this.state.gamers[gamerIndex][type] = value;
            this.updateState();
        }
    },

    componentDidMount: function() {
        MainDispatcher.on('createPlayer', this.addGamer);
        MainDispatcher.on('onCellChange', this.onCellChange);
    },

    componentWillUnmount: function() {
        MainDispatcher.removeListener('createPlayer', this.addGamer);
        MainDispatcher.removeListener('onCellChange', this.onCellChange);
    },

    render: function() {
        var that = this;
        return (
            <table className="table table-striped table-bordered"> 
                <tbody>

                    <tr>
                        <th className="th1"></th>
                        <th className="th2">
                            <span className="sort-column double-carret disable-select" onClick={this.sortColumn.bind(null, 'nickname')} >Nickname</span>
                        </th>
                        <th className="th3">
                            <span className="sort-column double-carret disable-select" onClick={this.sortColumn.bind(null, 'role')} >Role</span>
                        </th>
                        <th className="th4">
                            <span className="sort-column double-carret disable-select" onClick={this.sortColumn.bind(null, 'age')} >Age</span>
                        </th>
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