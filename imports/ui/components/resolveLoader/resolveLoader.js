import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './resolveLoader.html';


class ResolveLoader{
    constructor($rootScope){
        'ngInject';

        console.log('resolve?');
        this.restrict='E';
        this.replace='true';
        this.$rootScope = $rootScope;
        //this.link = this.linkFunction;
    }
    link(scope, element){
        console.log('aqui')
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            console.log('aqui 2')
            if (fromState.name !== "") return;
            element.removeClass('ng-hide');
        });

        $rootScope.$on('$stateChangeSuccess', function () {
            console.log('aqui 3')
            element.addClass('ng-hide');
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
