import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './profileStructure.html';

import { name as Sidebar } from '../sidebar/sidebar';
import { name as Profile } from '../profile/profile';
import { name as ResolveLoader } from '../../resolveLoader/resolveLoader';

class ProfileStructure {}

const name = 'profileStructure';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Sidebar,
    Profile,
    ResolveLoader
]).component(name, {
    templateUrl: `imports/ui/components/front/${name}/${name}.html`,
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
