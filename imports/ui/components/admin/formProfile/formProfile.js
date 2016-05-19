import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './formProfile.html';

import { Profiles } from '../../../../api/profiles';




class FormProfile {
    constructor($scope, $reactive, $state){
        'ngInject';

        $reactive(this).attach($scope);

        //helpers
        this.helpers({
            profile ()  {
                return Profiles.findOne({});
            }
        });


    }
}

const name = 'formProfile';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
    controllerAs: "vm",
    controller: FormProfile
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('admin.profile', {
            url: "/profile",
            views: {
                'content@admin': {
                    template: '<form-profile></form-profile>'
                }
            },
            data: {
                title: 'New Cover Letter'
            },
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
