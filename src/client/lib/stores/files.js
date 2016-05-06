 Files = new FS.Collection('files', {
   stores: [new FS.Store.S3('files')],
   filter: {
     allow: {
       contentTypes: Meteor.settings.public.allowContentTypes
     },
     onInvalid: function(message) {
       toastr.error(message);
     }
   }
 });

 Files.allow({
   insert: function() {
     return true;
   },
   update: function() {
     return true;
   },
   download: function() {
     return true;
   }
 });
