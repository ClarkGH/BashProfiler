function HistoryController ( $scope, $sce, Log, FileStructure ){
    $scope.entries = Log.entries(),

    $scope.$watch( Log.entries, function ( newVal, oldVal ) {
      if ( newVal && newVal != oldVal ) $scope.entries = newVal;
    }),

    $scope.setFocus = function(){
        if ( event.target.id === "terminal-container" ) {
            document.getElementById('hidden-field').focus();
            document.getElementById('cursor').classList.add('blink');
        } else {
            document.getElementById('cursor').classList.remove('blink');
        }
    }
}