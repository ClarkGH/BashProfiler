describe("Command Controller", function(){

    beforeEach( module('BashProfiler') );

    var ctrl, scope;

    beforeEach(function() {
        LogMock = {

            terminalHistory: [],

            entries: function(book) {
                return this.terminalHistory
            },

            clear: function() {
                this.terminalHistory = []
            },

            addEntry: function( command, returnValue, currentDir ) {
                this.terminalHistory.push( {command: command, returnValue: returnValue, currentDir: currentDir} );
            }

       };
   });

    beforeEach( inject( function ( $rootScope, $controller ) {

        scope = $rootScope.$new();
        scope.inputForm = {
            $valid: true,
            $setPristine: function(){}
        }

        ctrl = $controller("CommandController", { $scope: scope, Log: LogMock });
    }));

    it(  "should identify whether a command is invalid", function(){
        scope.textInputField = "Foo";
        expect( scope.parseInput() ).toEqual( "Foo: command not found" );
    });

    it(  "should be able to create a directory", function(){
        scope.textInputField = "mkdir Foo";
        scope.parseInput();
        expect( scope.ls().split(" ").last() ).toEqual( "Foo" );
    });

    it( "should add each command to the history", function(){
        scope.textInputField = "mkdir Foo";
        scope.parseInput();
        scope.textInputField = "foo";
        scope.parseInput();

        expect( LogMock.entries().length ).toEqual( 2 )
    });

    it( "should clear the history", function(){
        scope.textInputField = "mkdir Foo";
        scope.parseInput();
        scope.textInputField = "foo";
        scope.parseInput();
        scope.clear();

        expect( LogMock.entries().length ).toEqual( 0 );
    });

    it(  "should create a directory in another directory without changing the current path", function(){
        scope.textInputField = "mkdir ../../Foo";
        scope.parseInput();
        expect( scope.pwd() ).toEqual("/root/Users/Connor");

        scope.cd('../..');
        expect( scope.ls().split(" ").last() ).toEqual( "Foo" );
    });

    it(  "should return the current directory", function(){
        expect( scope.pwd() ).toEqual( '/root/Users/Connor' );
    });

    it(  "should be able to change directories", function(){
        scope.$apply();
        scope.cd("../Clark/Applications");
        scope.$apply();

        expect( scope.currentPath ).toEqual( '/root/Users/Clark/Applications' );
    });

    it( "should not change to a directory that doesn't exist", function(){
        expect( scope.cd("../Patrick/Foo") ).toEqual( "No such file or directory: ../Patrick/Foo" );
    })

})