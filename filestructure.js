function FileStructure(){
  this.navigation = ["root", "Users", "Connor"];
  this.tree = {
    "root": {
      "Applications":{},
      "Library":{},
      "System":{}
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
        },
      }
    }
  }
}

FileStructure.prototype = {
  ascend: function() {
    this.navigation.pop();
  },

  descend: function( file ) {
    this.navigation.push( file );
  }
}