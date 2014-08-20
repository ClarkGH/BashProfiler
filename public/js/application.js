var bashProfiler = angular.module('BashProfiler', []);
bashProfiler.controller( 'HistoryController', [ '$scope', '$sce', 'Log', 'FileStructure', HistoryController ] );
bashProfiler.controller( 'CommandController', [ '$scope', '$sce', 'Log', 'FileStructure', CommandController ] );
bashProfiler.controller( 'DummyController', ['$scope'] )

function DummyController( $scope ) {
    $scope.foo = "Bar"
}

Array.prototype.last = function(){
  return this[this.length - 1]
}

bashProfiler.factory('Log', Log)
bashProfiler.factory('FileStructure', FileStructure)