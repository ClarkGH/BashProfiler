$(document).ready(function() {
    var parser = new CmdParser();
    parser.cd('../Patrick')
    console.log(parser.fileStructure.navigation)
});

Array.prototype.last = function(){
  return this[this.length - 1]
}