import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './resolveLoader.html';


class ResolveLoader{
    constructor($rootScope){
        'ngInject';
        var vm = this;
        vm.hide = true;
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            if (fromState.name !== "") return;
            vm.hide = false;
        });

        $rootScope.$on('$stateChangeSuccess', function () {
            vm.hide = true;
        });

    }
}

const name = 'resolveLoader';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: ResolveLoader
});



/*angular.module('cv').directive('resolveLoader', function ($rootScope) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'client/cv/resolveloader/resolveloader.html',
        link: function (scope, element) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
                if (fromState.name !== "") return;
                element.removeClass('ng-hide');
            });

            $rootScope.$on('$stateChangeSuccess', function () {
                element.addClass('ng-hide');
            });
        }
    };
});*/
