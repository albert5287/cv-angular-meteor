Meteor.publish("coverLetters", function(){
	return CoverLetters.find({});
});