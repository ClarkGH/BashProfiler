describe("Command Controller", function(){

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
        ctrl = $controller("CommandController", { $scope: scope });
    }));

    it(  "should identify whether a command is invalid", function(){
        scope.textInputField = "Foo";
        expect( scope.parseInput() ).toBe( "Foo: command not found" );
    });

    it(  "should be able to create a directory", function(){
        scope.textInputField = "mkdir Foo";
        scope.parseInput();
        expect( scope.ls().split(" ").last() ).toBe( "Foo" );
    });

    it(  "should create a directory in another directory without changing the current path", function(){
        scope.textInputField = "mkdir ../../Foo";
        scope.parseInput();
        expect( scope.pwd() ).toBe("/root/Users/Connor");

        scope.cd('../..');
        expect( scope.ls().split(" ").last() ).toBe( "Foo" );
    });


    it(  "should return the current directory", function(){
        expect( scope.pwd() ).toBe( '/root/Users/Connor' );
    });

    it(  "should be able to change directories", function(){
        scope.$apply()
        scope.cd("../Clark/Applications");
        scope.$apply()

        expect( scope.currentPath ).toBe( '/root/Users/Clark/Applications' )
    });

    it( "should not change to a directory that doesn't exist", function(){

        expect( scope.cd("../Patrick/Foo") ).toBe( "No such file or directory: ../Patrick/Foo" )
    })


    // it( "should list the contents of the current directory')
})