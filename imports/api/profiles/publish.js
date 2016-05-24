import { Meteor } from 'meteor/meteor';

import { Profiles } from './collection';

if (Meteor.isServer) {
    Meteor.publish("profile", function(){
        return Profiles.find({});
    });
}