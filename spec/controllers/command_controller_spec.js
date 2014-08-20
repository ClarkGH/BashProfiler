describe('Command Controller', function(){

    beforeEach( module('BashProfiler') );

    var ctrl, scope;

    beforeEach( inject( function ( $rootScope, $controller ) {

        scope = $rootScope.$new();
        ctrl = $controller('CommandController', { $scope: scope });
    }));

    it('should identify valid commands', function(){
        expect( scope.validCommand('foo') ).toBe(false)
    });

    it('should return the current directory', function(){
        expect( scope.pwd() ).toBe('/root/Users/Connor')
    })
})