

function Log () {
    var terminalHistory = [];
    var commandHistory = [];

    _addCommand = function( command ) {
        if ( commandHistory.length >= 10 ) commandHistory.pop();
        commandHistory.push( command );
    }

    _addToHistory = function( command, returnValue, currentDir ){
        if ( terminalHistory.length >= 14 ) terminalHistory.pop();
        terminalHistory.push( { command: command, returnValue: returnValue, currentDir: currentDir } );
    }

    return {
        addEntry: function( command, returnValue, currentDir ) {
            _addToHistory( command, returnValue, currentDir )
            _addCommand( command );
        },

        entries: function() {
            return terminalHistory
        },

        commands: function() {
            return commandHistory
        },

        clear: function() {
            terminalHistory = []
        }
    }

}