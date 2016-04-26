import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Files = new Mongo.Collection("files");
//TODO: allow methods to modify the files

function loggedIn(userId) {
    return true;
    //return !!userId;
}

Files.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});