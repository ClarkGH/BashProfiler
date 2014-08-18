var terminalEmulator = angular.module( 'terminalEmulator', [] )

terminalEmulator.controller( 'ParserController', [ '$scope', ParserController ] );


function ParserController( $scope ) {
    $scope.fileStructure = new FileStructure(),
    $scope.commandHistory = [],
    $scope.textInput = "",
    $scope.terminalReturn = "",

    $scope.specialInput = function(){
        if ( event.which === 8 ) {
            $scope.textInput = $scope.textInput.substr(0, $scope.textInput.length - 1)
        } else if ( event.which === 38 ) {
            var lastCommand = $scope.commandHistory.pop();
            $scope.commandHistory.unshift(lastCommand);
            $scope.textInput = lastCommand;
        }
    },

    $scope.parseInput = function(){

        if ( event.charCode === 13 ) {
            $scope.terminalReturn = ""
            var stringArray = $scope.textInput.split(" ")
            var command = stringArray.shift()

            $scope.commandHistory.push($scope.textInput);



            if ( Object.keys(this).indexOf( command ) != -1) {
                $scope[command]( stringArray.join() )
            }

            var terminalHistoryEntry = '<div>' + document.getElementById('pre-cursor').innerHTML + $scope.textInput + '<div>' + $scope.terminalReturn + '</div></div>'


            if ( $('#terminal-history').children().length < 14 ) {
                $('#terminal-history').append(terminalHistoryEntry)
            } else {
                $('#terminal-history').children()[0].remove()
                $('#terminal-history').append(terminalHistoryEntry)
            }

            event.target.value = ''
            $scope.textInput = ''

        } else {
            $scope.textInput += String.fromCharCode(event.charCode);
        }

    },

    $scope.cd = function( navString ) {
        var navArray;
        ;

        if ( navString  ) {

            navArray = navString.split("/");

            var startingLocation = $scope.fileStructure.currentLocation();
            for( var i = 0; i < navArray.length; i++ ) {
                if ( navArray[i] === ".." ) {
                    $scope.fileStructure.ascend();
                } else if ( navArray[i] === "." ) {
                    continue
                } else {
                    if ( ! $scope.fileStructure.descend(navArray[i]) ) {
                        $scope.fileStructure.navigation = startingLocation;
                        return
                    }
                }
            }

        } else {
            $scope.fileStructure.goToHome();
        }

    },

    $scope.pwd = function() {
        $scope.terminalReturn = $scope.fileStructure.currentPath();
    },

    $scope.ls = function( filePath ) {
        if ( filePath ){
            var currentLocation = $scope.fileStructure.navigation.slice(0);
            $scope.cd( filePath );
        }

        var currentLocProperties = Object.keys($scope.fileStructure.goToCurrent()).join(' ');

        if ( filePath ){
            $scope.fileStructure.navigation = currentLocation;
        }

        $scope.terminalReturn = currentLocProperties;
    },

    $scope.mkdir = function( filePath ) {
        var pathArray = filePath.split("/")
        var newDirectory = pathArray.pop()
        var currentLocation = $scope.fileStructure.navigation.slice(0);

        $scope.cd( pathArray.join("/") );
        $scope.fileStructure.createDirectory(newDirectory);
        $scope.fileStructure.navigation = currentLocation;
    },

    $scope.clear = function(){
        document.getElementById('terminal-history').innerHTML = '';
    }
}