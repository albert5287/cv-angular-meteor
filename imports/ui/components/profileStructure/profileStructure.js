import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './profileStructure.html';

import { name as Sidebar } from '../sidebar/sidebar';
import { name as Profile } from '../profile/profile';

class ProfileStructure {}

const name = 'profileStructure';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Sidebar,
    Profile
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: ProfileStructure
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('profile', {
            abstract: true,
            template: '<profile-structure></profile-structure>',
            resolve: {
                profile: ['$q', function ($q) {
                    var deferred = $q.defer();

                    Meteor.subscribe('profile', {
                        onReady: deferred.resolve,
                        onStop: deferred.reject
                    });

                    return deferred.promise;
                }]
            }
        });
}




/*angular.module('cv').directive('profilestructure', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'client/cv/profilestructure/profileStructure.html'
    };
});
*/