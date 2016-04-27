import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'textangular/dist/textAngular-sanitize';
import textangular from 'textangular';
import ngFileUpload from 'ng-file-upload';

import { Meteor } from 'meteor/meteor';

import './formCoverLetter.html';

import { CoverLetters } from '../../../../api/coverLetters';
import { Files } from '../../../../api/files';




class FormCoverLetter {
    constructor($scope, $reactive, $state){
        'ngInject';

        var vm = this;
        $reactive(vm).attach($scope);

        this.$state = $state;
        this.edit = false;

        vm.headline = 'New Cover Letter';

        var letter = {
            name : '',
            title: '',
            subtitle: '',
            content: ''
        };

        //edit a cover letter
        if(this.$state.params.id){
            this.edit = true;
            vm.headline = 'Edit';
        }

        //helpers
        vm.helpers({
            coverLetter ()  {
                if(this.edit){
                    var coverLetter = CoverLetters.findOne({_id: $state.params.id});
                    if(coverLetter.fileId){
                        coverLetter.file = Files.findOne({_id: coverLetter.fileId});
                    }
                    console.log(coverLetter);
                    return coverLetter;
                    //return CoverLetters.findOne({_id: $state.params.id});
                }
                else{
                    return letter;
                }
            },
            files(){
                var test = Files.findOne({});
                return test;
            }
        });


    }

    save(){
        var coverLetter = this.coverLetter;
        var file = this.file;
        if(file){
            //if there is a previous file, delete
            if(coverLetter.idFile){
                Files.remove({_id: coverLetter.fileId});
            }
            var fileId = Files.insert(file);
            coverLetter.fileId = fileId;
        }
        Meteor.call('saveCoverLetter', coverLetter,
            (error, result) => {
                if(error){
                    console.log('error', error);
                }
                else{
                    if(this.edit){
                        this.$state.go('admin.coverLetters');
                    }
                    else{
                        this.$state.go('admin.coverLetters.edit', {id: result.insertedId});
                    }
                }
            }
        );
    }
}

const name = 'formCoverLetter';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    textangular,
    ngFileUpload,
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
            },
            resolve: {
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
                var letter = CoverLetters.findOne({_id: $stateParams.id});
                if (!letter) {
                    $state.go('admin.coverLetters');
                }
            }
        });

}
