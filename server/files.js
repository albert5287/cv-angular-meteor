Files.allow({
    insert: function (userId) {
        return (userId ? true : false);
    },
    remove: function (userId) {
        return (userId ? true : false);
    },
    download: function () {
        return true;
    },
    update: function (userId) {
        return (userId ? true : false);
    }
});

Meteor.publish('files', function() {
    return Files.find({});
});