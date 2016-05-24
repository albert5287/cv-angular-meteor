import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './coverLetter.html';

import { CoverLetters } from '../../../../api/coverLetters';
import { Files } from '../../../../api/files';

class CoverLetter {
    constructor($scope, $reactive, $stateParams, $sce){
        'ngInject';

        $reactive(this).attach($scope);

        //var coverLetter = CoverLetters.findOne({slug: $stateParams.slug});
        this.helpers({
            coverLetter: () => {
                return CoverLetters.findOne({slug: $stateParams.slug});
            },
            fileUrl: () => {
                var url =  Files.findOne({_id : this.coverLetter.fileId});
                if(url){
                    return url.url();
                }
                else{
                    return false;
                }
            }

        });

       this.getContent = function(content){
            return $sce.trustAsHtml(content);
        }

    }
}

const name = 'coverLetter';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/front/${name}/${name}.html`,
    controllerAs: name,
    controller: CoverLetter
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('profile.coverLetter', {
            url: "/cover-letter/:slug",
            views: {
                content: {
                    template: '<cover-letter></cover-letter>'
                }
            },
            resolve: {
                coverLetter: ['$q', function ($q) {
                    var deferred = $q.defer();

                    Meteor.subscribe('coverLetters', {
                        onReady: deferred.resolve,
                        onStop: deferred.reject
                    });

                    return deferred.promise;
                }],
                files: ['$q', function ($q) {
                    var deferred = $q.defer();

                    Meteor.subscribe('files', {
                        onReady: deferred.resolve,
                        onStop: deferred.reject
                    });

                    return deferred.promise;
                }]
            },
            onEnter: function ($stateParams, $state) {
                var letter = CoverLetters.findOne({slug: $stateParams.slug});
                if (!letter) {
                    $state.go('profile.cv');
                }
            }
        });

}