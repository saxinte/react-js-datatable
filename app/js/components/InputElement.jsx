var React = require('react');

var InputElement = React.createClass({
    
    render: function() {
        var className = this.props.editMode ? 'cell-input form-control' : 'cell-input form-control hidden';
        return (
            <input type="text" className={className} defaultValue={this.props.defaultValue} onBlur={this.props.onBlur} onChange={this.props.onChange} />
        );
    }

});

module.exports = InputElement;