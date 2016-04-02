angular.module('cv').directive('resolveLoader', function ($rootScope) {

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
});
