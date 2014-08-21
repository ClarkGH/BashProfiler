
var bashProfiler = angular.module('BashProfiler', []);

bashProfiler.controller( 'CommandController', [ '$scope', '$sce', 'Log', 'FileStructure', CommandController ] );

bashProfiler.factory('Log', Log)
bashProfiler.factory('FileStructure', FileStructure)

Array.prototype.last = function(){
  return this[this.length - 1]
}