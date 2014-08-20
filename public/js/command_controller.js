function CommandController( $scope, $sce, Log, FileStructure ) {
    $scope.currentPath = FileStructure.currentPath(),
    $scope.currentDir = FileStructure.currentDir(),

    $scope.$watch( FileStructure.currentDir, function( newVal, oldVal ) {
        if ( newVal && newVal != oldVal ) $scope.currentDir = newVal;
    })

    $scope.$watch( FileStructure.currentPath, function( newVal, oldVal ) {
        if ( newVal && newVal != oldVal ) $scope.currentPath = newVal;
    })

    $scope.toTrusted = function( html ){
        if ( html ){
            html = html.replace(/\s/g, "&nbsp;");
        }

        return $sce.trustAsHtml( html );
    },

    $scope.validCommand = function( command ) {
        return Object.keys( this ).indexOf( command ) != -1
    },

    $scope.clearForm = function( $scope ) {
        $scope.textInputField = "";
        $scope.inputForm.$setPristine();
    },

    $scope.parseInput = function(){
        var returnValue;
        var stringArray = this.textInputField.split(" ");
        var command = stringArray.shift();

        returnValue = $scope.validCommand( command ) ? $scope[command]( stringArray.join() ) : command + ": command not found"

        if ( command != "clear" ) Log.addEntry( this.textInputField, returnValue, $scope.currentDir );

        return returnValue

        $scope.clearForm( this );
    },

    $scope.cd = function( navString ) {
        var navArray;
        var startingLocation;

        if ( navString ) {

            navArray = navString.split("/");

            startingLocation = $scope.currentPath;
            for( var i = 0; i < navArray.length; i++ ) {
                if ( navArray[i] === ".." ) {
                    FileStructure.ascend();
                } else if ( navArray[i] === "." ) {
                    continue
                } else {
                    if ( ! FileStructure.descend(navArray[i]) ) {
                        return "No such file or directory: " + navString
                    }
                }
            }

        } else {
            FileStructure.goToHome();
        }
    },

    $scope.pwd = function() {
        return $scope.currentPath;
    },

    $scope.ls = function( filePath ) {
        if ( filePath ){
            var currentLocation = FileStructure.navigation().join('/')

            var returnValue = $scope.cd( filePath )
        }
        if ( returnValue ) {
            return returnValue
        } else {
            var currentLocProperties = Object.keys(FileStructure.goToCurrent());

            currentLocProperties = currentLocProperties.length > 0 ? currentLocProperties.join(" ") : ""

            if ( filePath ) {
                $scope.cd()
                $scope.cd(currentLocation);
            }
            return currentLocProperties
        }

    },

    $scope.mkdir = function( filePath ) {
        var pathArray = filePath.split("/")
        var newDirectory = pathArray.pop()
        var currentLocation = FileStructure.navigation().join('/');

        $scope.cd( pathArray.join("/") );
        FileStructure.createDir( newDirectory );
        FileStructure.goToHome();
        $scope.cd( currentLocation );
    },

    $scope.clear = function(){
        Log.clear();
    }
}