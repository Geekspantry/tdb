import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import parse from 'csv-parse';
import Fiber from 'fibers';

import { Technologies } from '../../imports/api/technologies/technologies';
import { TechnologiesDescriptions } from '../../imports/api/technologies_descriptions/technologies_descriptions';
import { DESCRIPTION_STATUS } from '../../imports/api/technologies_descriptions/schema.js';


function parsePhotoLinks(photoColumnItem) {
  return photoColumnItem.replace(/ /g, '').split(',') || [];
}

function isValidUrl(url) {
  return new RegExp(SimpleSchema.RegEx.Url).test(url);
}

function fetchImage(url) {
  return new Promise((resolve, reject) => {
    if (isValidUrl(url)) {
      Meteor.call('uploadImageFromUrl', url, (err, res) => {
        if (err) {
          console.log('Error downloading image...', url);
          resolve(undefined);
        } else {
          resolve(res);
        }
      });
    } else {
      console.log('Invalid url. Skiping...', url);
      resolve(undefined);
    }
  });
}

const parseOptions = {
  columns: true,
  trim: true
};

function insertOrganizations(orgSheet) {
  let index = 0;
  let ids = {};

  parse(orgSheet, parseOptions, Meteor.bindEnvironment(function(err, results) {
    console.info(`Starting to insert ${results.length} organizations...`);

    function execute(index) {
      console.log(`[insertOrganizations] Started ${index} execution...`);

      let orgSheetItem = results[index];
      orgSheetItem.photo = orgSheetItem['image url'].trim();
      fetchImage(orgSheetItem.photo).then(imageId => {
        let orgObj = {
          name: orgSheetItem.name,
          description: orgSheetItem.description,
          url: orgSheetItem.url
        };

        if (imageId) {
          orgObj.logo = imageId;
        }

        Organizations.insert(orgObj, (err, res) => {
          if (err) console.error(err);
          else {
            console.info('Organization added:', res);

            ids[orgSheetItem.id] = res;
            if (index < 5) {
              index++;
              execute(index);
            } else {
              console.log('Mapped Successfully:', ids);
              return ids;
            }
          }
        });
      });
    }
    execute(index);
  }));
}

function insertTechnologies(techSheet) {
  function execute(index) {
    console.log(`-> Starting ${index} execution...`);

    let tech = techArray[index];
    tech.photo = parsePhotoLinks(tech.photo);

    Promise.all(tech.photo.map(url => fetchImage(url))).then(imagesId => {
      console.log('-> All images dowloaded');

      let techObj = {
        name: tech.name,
        status: 'draft'
      };

      techObj.images = imagesId
        .filter(r => r !== undefined)
        .map((imageId, i) => {
          return {
            src: imageId,
            showcased: !i
          };
        });

      console.log(JSON.stringify(techObj));

      const _id = Meteor.call('technologies.insert', techObj, (err, res) => {
        if (err) console.log(err);
        else {
          console.info('-> Technology added successfully', res);

          const description = {
            technologyId: res,
            shortText: tech.name,
            longText: tech.description,
            status: DESCRIPTION_STATUS.PUBLISHED
          };

          Meteor.call('technologies_descriptions.insert', description, (err, res) => {
            console.log('Description attached to', res);
            if (current < techArray.length - 1) {
              current++;
              execute(current);
            }
          });
        }
      });
    });
  }
}

function insertAttachments(attachSheet) {
  let index = 0;
  let ids = {};

  parse(attachSheet, parseOptions, Meteor.bindEnvironment(function(err, results) {
    console.info(`[insertAttachments] Starting to insert ${results.length} attachments...`);

    function execute(index) {
      console.log(`[insertAttachments] Started ${index} execution...`);

      let attachSheetItem = results[index];

      console.log(attachSheetItem);
      let url = HTTP.call('HEAD', attachSheetItem.url)
      console.log(url)

      // Meteor.call('attachData', attachSheetItem.url, function(err, res) {
      //   if (err) console.log(err);
      //   else {
      //     console.log(res);
      //   }



      //   if (index < attachSheet.length - 1) {
      //     execute(index++)
      //   }
      // });
      // if (isValidUrl(attachSheet[index].Image){
      //   fetchImage(attachSheet[index].Image).then(imageId => {
      //     imageId = imageId;


      //   })
      // })

    }
    execute(14  );
  }));

}

Meteor.methods({
  import: function() {
    const techSheet = Assets.getText('SWIFT_Viz/technologies.csv');
    const orgSheet = Assets.getText('SWIFT_Viz/organizations.csv');
    const attachSheet = Assets.getText('SWIFT_Viz/attachments.csv');






    // insertOrganizations(orgSheet);
    insertAttachments(attachSheet);

  }
});
