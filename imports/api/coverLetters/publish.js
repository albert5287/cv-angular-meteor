import { Meteor } from 'meteor/meteor';

import { CoverLetters } from './collection';

if (Meteor.isServer) {
    Meteor.publish("coverLetters", function(){
        return CoverLetters.find({});
    });
}