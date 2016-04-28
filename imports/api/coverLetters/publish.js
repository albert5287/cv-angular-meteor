import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { CoverLetters } from './collection';

if (Meteor.isServer) {
    Meteor.publish("coverLetters", function(options){

        const selector = {};

        Counts.publish(this, 'numberOfCoverLetters', CoverLetters.find(selector), {
            noReady: true
        });

        return CoverLetters.find(selector, options);
    });
}