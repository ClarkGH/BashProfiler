
var bashProfiler = angular.module('BashProfiler', []);

bashProfiler.controller( 'CommandController', [ '$scope', '$sce', 'Log', 'FileStructure', 'Options', CommandController ] );
bashProfiler.controller( 'BashProfileController', [ '$scope', 'Options', BashProfileController ] );

bashProfiler.factory('Log', Log)
bashProfiler.factory('FileStructure', FileStructure)
bashProfiler.factory('Options', Options)

function Options() {

    return {
        currentGitBranch: false,

        uncommitedChanges: false,

        statusAgainstOrigin: false,

        workingDir: false,

        caret: "&#10233;",

        caretOptions: ["&#10233;","$", ">", ":"],

        toggleGitBranch: function(){
            this.currentGitBranch = !this.currentGitBranch;
        },

        toggleUncommitedChanges: function(){
            this.uncommitedChanges = !this.uncommitedChanges;
        },

        toggleStatusAgainstOrigin: function(){
            this.statusAgainstOrigin = !this.statusAgainstOrigin;
        },

        toggleWorkingDir: function(){
            this.workingDir = !this.workingDir;
        },

        changecaret: function(){
            this.caret = event.target.value;
        }
    }
}

Array.prototype.last = function(){
  return this[this.length - 1]
}