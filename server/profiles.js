Meteor.publish("profile", function(){
	return Profiles.find({});
});