function HelloController($scope) {
  $scope.userInput = { text: 'Hello' };
}

function ParserController( $scope ) {
    $scope.fileStructure = new FileStructure(),

    $scope.parseInput = function(){
        if (event.charCode == "13"){
            var stringArray = event.target.value.split(" ")
            var command = stringArray.shift()
            event.target.value = ''

            if ( Object.keys(this).indexOf( command ) != -1) {
                $scope[command](stringArray.join())
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
    }
}