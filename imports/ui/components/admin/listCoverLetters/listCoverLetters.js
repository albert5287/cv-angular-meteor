import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './listCoverLetters.html';

import { CoverLetters } from '../../../../api/coverLetters';


class ListCoverLetters {
    constructor($scope, $reactive){
        'ngInject';

        $reactive(this).attach($scope);

        this.helpers({
            coverLetters ()  {
                return CoverLetters.findOne({});
            }

        });



    }
}

const name = 'listCoverLetters';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
    controllerAs: name,
    controller: ListCoverLetters
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('admin.coverLetters', {
            url: "/cover-letters",
            views: {
                content: {
                    template: '<list-cover-letters></list-cover-letters>'
                }
            },
            data: {
                title: 'Cover Letters'
            }
        });

}
