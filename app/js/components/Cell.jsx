var React = require('react');

var Cell = React.createClass({

    getInitialState: function() {
        return {
            inputVisible: false
        }
    },

    toggleInput: function() {
        this.setState({
            inputVisible: this.state.inputVisible ? false : true
        });
    },

    onBlur: function(e) {
        this.toggleInput();
    },

    render: function() {
        return (
            <td>
                <div className="cell-content">
                    <label className="cell-label" onClick={this.toggleInput} >{this.props.content}</label>
                    { this.state.inputVisible ? <input type="text" className="cell-input form-control" placeholder={this.props.content} onBlur={this.onBlur} /> : null }
                </div>
            </td>
        )
    }

});

module.exports = Cell;