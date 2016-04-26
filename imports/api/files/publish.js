import { Meteor } from 'meteor/meteor';

import { Files } from './collection';

if (Meteor.isServer) {
    Meteor.publish("files", function(){
        return Files.find({});
    });
}