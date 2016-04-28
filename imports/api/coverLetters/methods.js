import { Meteor } from 'meteor/meteor';
import slug from 'slug';

import { CoverLetters } from './collection';
import { Files } from '../files/collection';

slug.defaults.mode ='rfc3986';

export function saveCoverLetter(coverLetter){
    if(!this.userId){
        throw new Meteor.Error(403, 'You must be logged in');
    }
    coverLetter.slug = slug(coverLetter.name); //create slug
    return CoverLetters.upsert(coverLetter._id, coverLetter); //update or insert if not exists
}

export function deleteCoverLetter(id){
    if(!this.userId){
        throw new Meteor.Error(403, 'You must be logged in');
    }
    var aux = CoverLetters.findOne({_id : id}); //get the coverLetter
    if(aux){
        //Remove the file if exists
        if(aux.fileId){
            Files.remove({_id: aux.fileId});
        }
        CoverLetters.remove({_id: id}); //remove the coverLetter
    }
}

Meteor.methods({
    saveCoverLetter,
    deleteCoverLetter
});
