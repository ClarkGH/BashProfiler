function FileStructure() {
    this.navigation = ["root", "Users", "Connor"];
    this.user = "Connor"
    this.tree = {
        "root": {
            "Applications":["Chrome", "Word", "Sublime", "uTorrent"],
            "Library":{},
            "System":{},
            "Users":{
                "Connor": {
                    "Applications": {},
                    "Desktop": {},
                    "Documents": {},
                    "Downloads": {}
                },
                "Clark": {
                    "Applications": {},
                    "Desktop": {},
                    "Documents": {},
                    "Downloads": {}
                },
                "Patrick":{
                    "Applications": {},
                    "Desktop": {},
                    "Documents": {},
                    "Downloads": {}
                }
            }
        }
    }
}

FileStructure.prototype = {
    ascend: function() {
        if ( this.navigation.length > 1 ) this.navigation.pop();
    },

    descend: function( file ) {
        var currentLocation = this.goToCurrent();

        if ( currentLocation[file] ) {
            this.navigation.push( file );
            return true;
        } else {
            return false;
        }
    },

    currentPath: function() {
        return this.navigation.join('/');
    },

    goToHome: function() {
        this.navigation = ["root", "Users", this.user];
    },

    createDirectory: function( newDirectory ) {
        var currentLocation = this.goToCurrent();

        currentLocation[newDirectory] = {};
    },

    goToCurrent: function() {
        var currentLocation = this.tree["root"];

        for ( var i = 1; i < this.navigation.length; i++ ) {
            currentLocation = currentLocation[this.navigation[i]];
        }

        return currentLocation
    }
}