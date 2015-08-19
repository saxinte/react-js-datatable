var React = require('react');
var InputElement  = require('./InputElement.jsx');

var Cell = React.createClass({

    getInitialState: function() {
        return {
            'INITIAL_VALUE': this.props.content,
            'value': this.props.content,
            'editMode': false
        }
    },

    updateValue: function(value) {
        this.setState({
            'value': value
        });
    },

    onChange: function(e) {
        this.updateValue(e.target.value);
    },

    inputFocus: function(element) {
        if(element){
            element.focus();
            element.value = element.value; // cursor end of text trick
        }
    },

    onStateChange: function() {

        // focus input element
        if(this.state.editMode){
            this.inputFocus( this.refs.inputElement.getDOMNode() );
        }else {

            // revert initial value if nothing was set
            if(!this.state.value.length){
                this.updateValue(this.state.INITIAL_VALUE);
            }
        }

    },

    toggleEditMode: function() {
        this.setState({
            'editMode': this.state.editMode ? false : true
        }, this.onStateChange);
    },

    render: function() {
        return (
            <td>
                <div className="cell-content">
                    <label className="cell-label" onClick={this.toggleEditMode}>{this.state.value}</label>
                    <InputElement ref="inputElement" value={this.state.value} editMode={this.state.editMode} onBlur={this.toggleEditMode} onChange={this.onChange} />
                </div>
            </td>
        )
    }

});

module.exports = Cell;