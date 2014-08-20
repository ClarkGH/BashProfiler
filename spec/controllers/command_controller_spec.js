describe('Command Controller', function(){

    beforeEach( module('BashProfiler') );

    var ctrl, scope;

    beforeEach( inject( function ( $rootScope, $controller ) {

        scope = $rootScope.$new();
        scope.inputForm = {
            $valid: true,
            $setPristine: function(){}
        }
        // filestructure = {
        //     navigation: ["root", "Users", "Connor"],
        //     tree:
        // }
        ctrl = $controller('CommandController', { $scope: scope });
    }));

    it( 'should identify whether a command is invalid', function(){
        scope.textInputField = "Foo"
        expect( scope.parseInput() ).toEqual( "Foo: command not found" )
    });

    it( 'should be able to create a directory', function(){
        scope.textInputField = "mkdir Foo"
        scope.parseInput()
        expect( scope.ls().split(" ").last() ).toEqual("Foo")
    });

    it('should return the current directory', function(){
        expect( scope.pwd() ).toBe( '/root/Users/Connor' )
    })


    // it('should list the contents of the current directory')
})