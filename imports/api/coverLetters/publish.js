import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { CoverLetters } from './collection';

if (Meteor.isServer) {
    Meteor.publish("coverLetters", function(options, searchString){

        const selector = {};

        if (typeof searchString === 'string' && searchString.length) {
            selector.name = {
                $regex: `.*${searchString}.*`,
                $options : 'i'
            };
        }

        Counts.publish(this, 'numberOfCoverLetters', CoverLetters.find(selector), {
            noReady: true
        });

        return CoverLetters.find(selector, options);
    });
}