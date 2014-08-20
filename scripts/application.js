var bashProfiler = angular.module( 'bashProfiler', [] );
bashProfiler.controller( 'HistoryController', [ '$scope', '$sce', 'Log', 'FileStructure', HistoryController ] );
bashProfiler.controller( 'CommandController', [ '$scope', '$sce', 'Log', 'FileStructure', CommandController ] );

Array.prototype.last = function(){
  return this[this.length - 1]
}

bashProfiler.factory('Log', Log)
bashProfiler.factory('FileStructure', FileStructure)