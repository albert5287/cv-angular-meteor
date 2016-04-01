angular.module('cv').directive('resolveLoader', function($rootScope, $timeout) {

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="alert alert-success ng-hide"><strong>Welcome!</strong> Content is loading, please hold.</div>',
        link: function(scope, element) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
                console.log('event',event);
                console.log('toState',toState);
                console.log('toParams',toParams);
                console.log('fromState',fromState);
                console.log('fromParams',fromParams);
                console.log('options',options);

                if (fromState.name !== "") return;
                element.removeClass('ng-hide');
                /*$timeout(function() {
                    console.log('hide??');
                    element.removeClass('ng-hide');
                });*/
            });

            $rootScope.$on('$stateChangeSuccess', function() {
                element.addClass('ng-hide');
            });
        }
    };
});
