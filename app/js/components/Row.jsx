var React = require('react');
var Cell  = require('./Cell.jsx');

var Row = React.createClass({
    
    render: function() {
        return (
            <tr>
                <td>
                    <button className="btn btn-danger btn-delete" onClick={this.props.deleteGamer}>Delete</button>
                </td>
                <Cell text={this.props.gamerObject.nickname} />
                <Cell text={this.props.gamerObject.role} />
                <Cell text={this.props.gamerObject.age} />
            </tr>
        )
    }

});

module.exports = Row;