import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './adminStructure.html';

import { name as Login } from '../login/login';
import { name as AdminSidebar } from '../adminSidebar/adminSidebar';
import { name as ListCoverLetters } from '../listCoverLetters/listCoverLetters';

class AdminStructure {
    constructor($state){
        'ngInject';

        var vm = this;
        vm.title = $state.current.data.title;
    }
}

const name = 'adminStructure';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Login,
    AdminSidebar,
    ListCoverLetters
]).component(name, {
    templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
    controllerAs: "vm",
    controller: AdminStructure
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('admin', {
            url: '/admin',
            abstract: true,
            template: '<admin-structure></admin-structure>',
            resolve: {
                currentUser($q){
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    }
                    else {
                        return $q.resolve();
                    }
                }
            }
        });
}

