import { Meteor } from 'meteor/meteor';

import { CoverLetters } from './collection';

export function saveCoverLetter(coverLetter){
    if(!this.userId){
        throw new Meteor.Error(403, 'You must be logged in');
    }
    return CoverLetters.upsert(coverLetter._id, coverLetter);
}

Meteor.methods({
    saveCoverLetter
});
