Files = new FS.Collection("files", {
    stores: [
        new FS.Store.GridFS("original")
    ],
    filter: {
        allow: {
            contentTypes: ['application/pdf', 'image/*']
        }
    }
});