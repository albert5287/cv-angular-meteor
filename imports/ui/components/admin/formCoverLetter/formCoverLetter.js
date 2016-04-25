import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './formCoverLetter.html';

import { CoverLetters } from '../../../../api/coverLetters';


class FormCoverLetter {
    constructor($scope, $reactive, $state){
        'ngInject';

        var vm = this;
        $reactive(vm).attach($scope);

        //edit a cover letter
        if($state.params.id){
            vm.headline = 'Edit';
            console.log('edit');
        }
        //new cover letter
        else{
            vm.headline = 'New Cover Letter';
            console.log('new');
        }


        vm.helpers({
            coverLetters ()  {
                return CoverLetters.find({});
            }

        });

    }
}

const name = 'formCoverLetter';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
    controllerAs: "vm",
    controller: FormCoverLetter
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('admin.coverLetters.add', {
            url: "/add",
            views: {
                'content@admin': {
                    template: '<form-cover-letter></form-cover-letter>'
                }
            },
            data: {
                title: 'New Cover Letter'
            }
        })
        .state('admin.coverLetters.edit', {
            url: "/edit/:id",
            views: {
                'content@admin': {
                    template: '<form-cover-letter></form-cover-letter>'
                }
            },
            data: {
                title: 'Edit Cover Letter'
            }
        });

}
