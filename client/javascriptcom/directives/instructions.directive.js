angular.module('javascriptcom').directive('jsInstructions', ['$compile', 'marked', 'jsCourseState', function($compile, marked, jsCourseState) {
  return {
    templateUrl: 'templates/instructions.html',
    replace: true,
    scope: true,
    bindToController: true,
    controllerAs: 'ctrl',
    require: '^jsChallenge'
  };
}]);
