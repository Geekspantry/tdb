// UploadList = new Mongo.Collection(null);

// const STATUS = {
//   IDLE: 0,
//   PROCESSING: 1,
//   DONE: 2,
//   ERROR: 3
// };

// UploadList.statics = {};
// UploadList.statics.setStatus = function(item, status) {
//   return UploadList.update({
//     _id: item._id
//   }, {
//     $set: {
//       status: status
//     }
//   });
// };

// UploadList.statics.decrementRemaining = function(item) {
//   return UploadList.update({
//     _id: item._id
//   }, {
//     $inc: {
//       uploaded: 1
//     }
//   });
// };

// UploadList.statics.setLinkStatus = function(item, url, status) {
//   return UploadList.update({
//     _id: item._id,
//     'links.url': url
//   }, {
//     $set: {
//       'links.$.status': STATUS.DONE
//     }
//   });
// };

// UploadList.statics.plantDoneObserver = function(item, cb) {
//   UploadList.find({
//     _id: item._id,
//     status: STATUS.PROCESSING
//   }).observe({
//     changed(newDoc, oldDoc) {
//       if (newDoc.uploaded === newDoc.total) {
//         cb(newDoc);
//       }
//     }
//   });
// };

// UploadList.statics.pushImageId = function(item, imageId) {
//   if (!imageId) return false;

//   console.log('pushing imageId ', imageId, ' to ', item.name);
//   return UploadList.update({
//     _id: item._id,
//   }, {
//     $push: {
//       imagesId: imageId
//     }
//   });
// };


// function dispatchTech(doc) {
//   console.log('Dispatching technology...');
//   console.log(doc);
//   Technologies.methods.add.call({
//     name: doc.name,
//     status: 'draft',
//     description: [{
//       status: 'draft',
//       longText: doc.description,
//       shortText: doc.description
//     }],
//     urls: [{
//       url: doc.url
//     }],
//     images: doc.imagesId && doc.imagesId.map((imageId, i) => {
//       return {
//         src: imageId,
//         showcased: !i
//       };
//     })
//   });
// }


Template.technologiesImport.events({
  'change [name="csv"]': function(e, t) {
    let parsedResults = [];

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete(results, file) {
        let items = results.data;
        let parsedItems = items.map((item) => {
          return {
            id: item['Card ID'],
            name: item['Card Name'],
            url: item['Card URL'],
            description: item['Card Description'],
            links: item['Attachment Links'] && item['Attachment Links'].replace(/ /g, '').split(',') || [],
          };
        });

        t.parsedItems.set(parsedItems);
      }
    });
  },

  'click #import': function(e, t) {
    let items = t.parsedItems.get();

    function downloadImage(url) {
      return new Promise((resolve, reject) => {
        if (new RegExp(SimpleSchema.RegEx.Url).test(url)) {
          Meteor.call('uploadImageFromUrl', url, (err, res) => {
            if (err) {
              console.log('Error downloading image...', url);
              // reject();
              resolve(undefined);

            } else {
              console.log('Solving promise...');
              resolve(res);
            }
          });
        } else {
          console.log('Invalid url. Skiping...', url);
          resolve(undefined);
        }
      });
    }

    function addTechnology(item, count) {
      downloadsTodo = item.links.map(link => downloadImage(link));
      Promise.all(downloadsTodo).then(results => {
        console.log(`Promise ${count} done!`, results);
        Technologies.methods.add.call({
          name: item.name,
          status: 'draft',
          description: [{
            status: 'draft',
            longText: item.description,
            shortText: item.description
          }],
          images: results.filter(r => r !== undefined).map((imageId, i) => {
            return {
              src: imageId,
              showcased: !i
            };
          })
        }, (err, res) => {
          console.log('Tech added!', count);
          count++;
          if (count < items.length) {
            addTechnology(items[count], count);
          }
        });
      });
    }

    addTechnology(items[0], 0);

    // UploadList.find().forEach((item) => {
    //   UploadList.statics.setStatus(item, STATUS.PROCESSING);
    //   let imagesId = [];

    //   UploadList.statics.plantDoneObserver(item, (doc) => {
    //     UploadList.statics.setStatus(doc, STATUS.DONE);
    //     dispatchTech(doc);
    //   });


    //   _.each(item.links, (link) => {
    //     let url = link.url;
    //     UploadList.statics.setLinkStatus(item, url, STATUS.PROCESSING);


    //     Meteor.call('uploadImageFromUrl', url, (err, res) => {
    //       if (err) {
    //         UploadList.statics.setLinkStatus(item, url, STATUS.ERROR);
    //       } else {
    //         UploadList.statics.setLinkStatus(item, url, STATUS.DONE);
    //         UploadList.statics.pushImageId(item, res);
    //       }
    //       UploadList.statics.decrementRemaining(item);
    //     });

    //     Meteor._sleepForMs(5000);

    //   });
    // });
  }
});

Template.technologiesImport.helpers({
  iconFromStatus() {
    switch (this.status) {
      case STATUS.IDLE:
        return 'fa fa-pause';
      case STATUS.PROCESSING:
        return 'fa fa-cogs fa-spin';
      case STATUS.DONE:
        return 'fa fa-check';
      default:
        return 'fa fa-question';
    }
  },
  parsedItems() {
    return Template.instance().parsedItems.get();
  }
});

Template.technologiesImport.onCreated(function() {
  this.parsedItems = new ReactiveVar();
});

