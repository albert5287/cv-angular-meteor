import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './adminSidebar.html';


class AdminSidebar{
    constructor(){
        'ngInject';

        var vm = this;
        vm.menu = [
            {
                state : 'admin.coverLetters',
                title: 'Cover letters',
                icon: 'insert_drive_file'
            }
        ];

        vm.menuItems = [
            {
                name: 'Dashboard',
                icon: 'dashboard',
                sref: '.dashboard'
            },
            {
                name: 'Profile',
                icon: 'person',
                sref: '.profile'
            },
            {
                name: 'Table',
                icon: 'view_module',
                sref: '.table'
            }
        ];

    }
}

const name = 'adminSidebar';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
    controllerAs: name,
    controller: AdminSidebar
})