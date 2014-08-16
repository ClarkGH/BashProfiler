$(document).ready(function() {
    var parser = new CmdParser();
});

Array.prototype.last = function(){
  return this[this.length - 1]
}