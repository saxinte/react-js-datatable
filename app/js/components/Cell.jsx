var React = require('react');
var InputElement  = require('./InputElement.jsx');
var MainDispatcher = require('../dispatchers/AppDispatcher.js');

var Cell = React.createClass({

    getInitialState: function() {
        return {
            'editMode': false
        }
    },

    onBlur: function(e) {

        // toggle input display
        this.toggleEditMode(); 

        // then emit new value
        MainDispatcher.emit('onCellChange', e.target.value, this.props.type, this.props.gamerObject);

    },

    inputFocus: function(element) {
        if(element){
            element.focus();
            element.value = element.value; // cursor end of text trick
        }
    },

    onStateChange: function(e) {
        if(this.state.editMode){
            this.inputFocus( this.refs.inputElement.getDOMNode() );
        }
    },

    toggleEditMode: function(e) {
        this.setState({
            'editMode': this.state.editMode ? false : true
        }, this.onStateChange);
    },

    render: function() {
        var value = this.props.gamerObject[this.props.type];
        return (
            <td>
                <div className="cell-content">
                    <label className="cell-label" onClick={this.toggleEditMode}>{value}</label>
                    <InputElement ref="inputElement" defaultValue={value} editMode={this.state.editMode} onBlur={this.onBlur} />
                </div>
            </td>
        )
    }

});

module.exports = Cell;