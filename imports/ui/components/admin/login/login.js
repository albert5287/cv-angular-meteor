import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './login.html';

class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.credentials = {
            email: '',
            password: ''
        };

        this.error = '';
    }

    login() {
        Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                }
                else {
                    this.$state.go('admin.coverLetters');
                }
            })
        );
    }
}

const name = 'login';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
])
    .component(name, {
        templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
        controllerAs: name,
        controller: Login
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('login', {
        url: '/admin/login',
        template: '<login></login>',
        onEnter: function($state){
            if(Meteor.userId()){
                $state.go('admin.coverLetters');
            }

        }
    });
}