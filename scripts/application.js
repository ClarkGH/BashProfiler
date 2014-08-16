$(document).ready(function() {
    var parser = new CmdParser();
    parser.mkdir("../Clark/Applications/Stuff")
    console.log(parser.ls("../Clark/Applications"))
    debugger
});

Array.prototype.last = function(){
  return this[this.length - 1]
}