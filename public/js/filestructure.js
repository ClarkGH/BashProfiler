function FileStructure () {
    var navigation = ["root", "Users", "Connor"];
    var user = "Connor"
    var tree = {
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

    return {
        navigation: function(){
            return navigation
        },

        currentPath: function(){
            return '/' + navigation.join('/')
        },

        currentDir: function(){
            return navigation.last();
        },

        ascend: function() {
            if ( navigation.length > 1 ) navigation.pop();
        },

        descend: function( file ) {
            var currentLocation = this.goToCurrent();

            if ( currentLocation[file] ) {
                navigation.push( file );
                return true
            } else {
                return false
            }
        },

        goToHome: function(){
            navigation = ["root", "Users", user];
        },

        createDir: function( newDirectory ){
            var currentLocation = this.goToCurrent();

            currentLocation[newDirectory] = {};
        },

        goToCurrent: function() {
            var currentLocation = tree["root"];

            for ( var i = 1; i < navigation.length; i++ ) {
                currentLocation = currentLocation[navigation[i]];
            }
            return currentLocation
        }
    }
}