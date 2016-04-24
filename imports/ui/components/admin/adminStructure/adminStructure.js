import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './adminStructure.html';

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
            template: '<admin-structure style="border: 1px solid blue"></admin-structure>'
        });
}