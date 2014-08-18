function HelloController($scope) {
  $scope.userInput = { text: 'Hello' };
}

function ParserController( $scope ) {
    $scope.fileStructure = new FileStructure(),
    $scope.history = [],

    $scope.parseInput = function(){
        if ( event.charCode == "13" ) {
            var stringArray = event.target.value.split(" ")
            var command = stringArray.shift()

            $scope.history.push(command);
            event.target.value = ''

            if ( Object.keys(this).indexOf( command ) != -1) {
                $scope[command]( stringArray.join() )
            }
        }
    },

    $scope.cd = function( navString ) {
        var navArray;
        if ( navString === "" || navString === undefined ) {
            this.fileStructure.goToHome();
        } else {
            navArray = navString.split("/");

            for( var i = 0; i < navArray.length; i++ ) {
                if ( navArray[i] === ".." ) {
                    this.fileStructure.ascend();
                } else if ( navArray[i] === "." ) {
                    continue
                } else {
                    this.fileStructure.descend(navArray[i])
                }
            }
        }
    },

    $scope.pwd = function() {
        return this.fileStructure.currentPath();
    },

    $scope.ls = function( filePath ) {
        if ( filePath ){
            var currentLocation = this.fileStructure.navigation.slice(0);
            this.cd( filePath );
        }
        var currentLocProperties = Object.keys(this.fileStructure.goToCurrent());

        if ( filePath ){
            this.fileStructure.navigation = currentLocation;
        }

        return currentLocProperties;
    },

    $scope.mkdir = function( filePath ) {
        var pathArray = filePath.split("/")
        var newDirectory = pathArray.pop()
        var currentLocation = $scope.fileStructure.navigation.slice(0);

        $scope.cd( pathArray.join("/") );
        $scope.fileStructure.createDirectory(newDirectory);
        $scope.fileStructure.navigation = currentLocation;
    }
}