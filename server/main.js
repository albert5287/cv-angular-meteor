import '../imports/startup/profiles';
import '../imports/api/profiles';
import '../imports/startup/coverLetters';
import '../imports/api/coverLetters';


if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        email: 'albertgrac@gmail.com',
        password: '123456',
    });
}