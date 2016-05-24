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

        $reactive(this).attach($scope);

        this.$state = $state;
        this.edit = false;
        this.deleteFile = false;

        this.headline = 'New Cover Letter';

        var letter = {
            name : '',
            title: '',
            subtitle: '',
            content: ''
        };

        //edit a cover letter
        if(this.$state.params.id){
            this.edit = true;
            this.headline = 'Edit';
        }

        //helpers
        this.helpers({
            coverLetter ()  {
                if(this.edit){
                    var coverLetter = CoverLetters.findOne({_id: $state.params.id});
                    if(coverLetter.fileId){
                        coverLetter.file = Files.findOne({_id: coverLetter.fileId});
                    }
                    return coverLetter;
                }
                else{
                    return letter;
                }
            }
        });


    }

    save(){
        var coverLetter = this.coverLetter;
        delete coverLetter.file; //delete the file key
        var file = this.file;
        //if there ia file to upload
        if(file){
            //if there is a previous file, delete
            if(coverLetter.fileId){
                Files.remove({_id: coverLetter.fileId});
            }
            var fileId = Files.insert(file)._id; //insert the file
            coverLetter.fileId = fileId; //assign the fileId to the cover letter
        }
        //if it is edit mode and is check to delete a file
        if(this.edit && this.deleteFile){
            Files.remove({_id: coverLetter.fileId}); //delete the file
            delete coverLetter.fileId; //delete the fileId key
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

    reset(){
        this.coverLetter = {};
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

/*
 import _ from 'underscore';
 import { Meteor } from 'meteor/meteor';
 import { check } from 'meteor/check';

 import { Parties } from './collection';

 function getContactEmail(user) {
 if (user.emails && user.emails.length)
 return user.emails[0].address;

 if (user.services && user.services.facebook && user.services.facebook.email)
 return user.services.facebook.email;

 return null;
 }

 export function invite(partyId, userId) {
 check(partyId, String);
 check(userId, String);

 if (!this.userId) {
 throw new Meteor.Error(400, 'You have to be logged in!');
 }

 const party = Parties.findOne(partyId);

 if (!party) {
 throw new Meteor.Error(404, 'No such party!');
 }

 if (party.owner !== this.userId) {
 throw new Meteor.Error(404, 'No permissions!');
 }

 if (party.public) {
 throw new Meteor.Error(400, 'That party is public. No need to invite people.');
 }

 if (userId !== party.owner && ! _.contains(party.invited, userId)) {
 Parties.update(partyId, {
 $addToSet: {
 invited: userId
 }
 });

 const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
 const to = getContactEmail(Meteor.users.findOne(userId));

 if (Meteor.isServer && to) {
 Email.send({
 to,
 replyTo,
 from: 'noreply@socially.com',
 subject: `PARTY: ${party.title}`,
 text: `
 Hey, I just invited you to ${party.title} on Socially.
 Come check it out: ${Meteor.absoluteUrl()}
 `
 });
 }
 }
 }

 Meteor.methods({
 invite
 });
* */