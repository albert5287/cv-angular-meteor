import { Mongo } from 'meteor/mongo';

export const Profiles = new Mongo.Collection("profiles");

//TODO: allow methods to modifz the profile