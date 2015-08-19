var React = require('react');
var MainDispatcher = require('../dispatchers/AppDispatcher.js');

var CreatePlayerButton = React.createClass({

    onClick: function(e) {

        e.preventDefault();

        var form = document.getElementById('player-form');
        var formElements, gamerObject = null;

        if(form){
            formElements = form.elements;
            gamerObject = {
                'nickname': formElements.nickname.value,
                'role': formElements.role.value,
                'age': formElements.age.value
            };
            MainDispatcher.emit('createPlayer', gamerObject);
        }
        
    },
    
    render: function() {
        return (
            <button type="submit" className="btn btn-success btn-submit-player" onClick={this.onClick}>Create</button>
        );
    }

});

module.exports = CreatePlayerButton;