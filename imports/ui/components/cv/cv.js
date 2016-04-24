import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './cv.html';

import { name as ResolveLoader } from '../resolveLoader/resolveLoader';
import { name as ProfileStructure } from '../front/profileStructure/profileStructure';
import { name as AdminStructure } from '../admin/adminStructure/adminStructure';

class Cv {}

const name = 'cv';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    ResolveLoader,
    ProfileStructure,
    AdminStructure,
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Cv
})
.config(config);

function config($locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');
}