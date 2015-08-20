var React = require('react');
var Cell  = require('./Cell.jsx');

var Row = React.createClass({
    
    render: function() {
        return (
            <tr>
                <td>
                    <button className="btn btn-danger btn-delete" onClick={this.props.deleteGamer}>Delete</button>
                </td>
                <Cell gamerObject={this.props.gamerObject} type="nickname" />
                <Cell gamerObject={this.props.gamerObject} type="role" />
                <Cell gamerObject={this.props.gamerObject} type="age" />
            </tr>
        )
    }

});

module.exports = Row;