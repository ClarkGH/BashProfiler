function FileStructure(){
    this.navigation = ["root", "Users", "Connor"];
    this.tree = {
        "root": {
            "Applications":{},
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
        this.navigation.pop() if this.navigation.length > 1;
    },

    descend: function( file ) {
        currentLocation = this.goToCurrent();
        if(currentLocation[file]){
            this.navigation.push( file );
        }else{
            return false;
        }
    },
    goToCurrent: function(){
        var currentLocation = this.tree["root"]
        for(var i = 0; i < this.navigation.length; i++){
            currentLocation = currentLocation[this.navigation[i]];
        }
    }
}

function CmdParser(){
    this.fileStructure = new FileStructure();
    this.history = [];
}

CmdParser.prototype = {
    cd: function(navString){
        navArray = navString.split("/");
        for(var i = 0; i < navArray.length; i++){
            if(navArray[i] === ".."){
                this.fileStructure.ascend();
            }else if(navArray[i] === "."){
                continue
            }else{
                this.fileStructure.descend(navArray[i])
            }
        }
    }
}