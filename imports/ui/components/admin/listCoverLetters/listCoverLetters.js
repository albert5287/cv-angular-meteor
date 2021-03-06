import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import './listCoverLetters.html';

import { CoverLetters } from '../../../../api/coverLetters';
import { name as Sorting } from '../sorting/sorting';


class ListCoverLetters {
    constructor($scope, $reactive){
        'ngInject';

        $reactive(this).attach($scope);

        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };
        this.searchText = '';

        this.subscribe('coverLetters', () => [
            {
                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                sort: this.getReactively('sort')
            },
            this.getReactively('searchText')

        ]);

        this.helpers({
            coverLetters ()  {
                var coverLetters = CoverLetters.find({}, {
                    sort : this.getReactively('sort')
                });
                console.log('coverLetters', coverLetters, coverLetters.count());
                return coverLetters;
            },
            coverLettersCount() {
                console.log('coverLettersCount', Counts.get('numberOfCoverLetters'))
                return Counts.get('numberOfCoverLetters');
            }

        });
    }

    deleteCoverLetter(id){
        Meteor.call('deleteCoverLetter', id,
            (error, result) => {
                if(error){
                    console.log('error', error);
                }
                else{
                    console.log('ok');
                }
            }
        );
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }
}

const name = 'listCoverLetters';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    utilsPagination,
    Sorting
]).component(name, {
    templateUrl: `imports/ui/components/admin/${name}/${name}.html`,
    controllerAs: "vm",
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
            },
            /*resolve: {
                coverLetter: ['$q', function ($q) {
                    var deferred = $q.defer();
                    Meteor.subscribe('coverLetters', {
                        onReady: deferred.resolve,
                        onStop: deferred.reject
                    });
                    return deferred.promise;
                }]
            },*/
        });

}
