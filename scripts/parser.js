function CmdParser(){
    this.fileStructure = new FileStructure();
    this.history = [];
}

CmdParser.prototype = {
    cd: function( navString ) {
        var navArray;

        if ( navString === "" || navString === undefined ) {
            this.fileStructure.goTokHome();
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

    pwd: function() {
        return this.fileStructure.currentPath();
    },

    ls: function( filePath ) {
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

    mkdir: function( filePath ) {
        var pathArray = filePath.split("/")
        var newDirectory = pathArray.pop()
        var currentLocation = this.fileStructure.navigation.slice(0);

        this.cd( pathArray.join("/") );
        this.fileStructure.createDirectory(newDirectory);
        this.fileStructure.navigation = currentLocation;
    }
}