import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './admin.html';


class Admin{}

const name = 'admin';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
    controllerAs: name,
    controller: Admin
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('admin', {
            url: "/admin",
            template: '<admin></admin>'
            /*views: {
                content: {
                    template: '<admin></admin>'
                }
            }*/
        });

}