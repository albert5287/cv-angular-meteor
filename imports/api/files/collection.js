import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { FS } from 'meteor/cfs:base-package';

export const Files = new FS.Collection("files", {
    stores: [
        new FS.Store.GridFS("original")
    ],
    filter: {
        allow: {
            contentTypes: ['application/pdf', 'image/*']
        }
    }
});
//export const Files = new Mongo.Collection("files");
//TODO: allow methods to modify the files

function loggedIn(userId) {
    //return true;
    return !!userId;
}

Files.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});