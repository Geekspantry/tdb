Cloudinary.helpers = {
  getCard(cloudinaryId, options = {}) {
    if (cloudinaryId) {
      let baseOptions = {
        width: 600,
        height: 400,
        crop: 'fill',
        gravity: 'center'
      };
      let finalOptions = {
        ...baseOptions,
        ...options
      };
      return $.cloudinary.url(cloudinaryId, finalOptions);
    }
    return 'https://placehold.it/600x400';
  },
  getMiniCard(cloudinaryId, options = {}) {
    if (cloudinaryId) {
      let baseOptions = {
        width: 50,
        height: 50,
        crop: 'fill',
        gravity: 'center'
      };
      let finalOptions = {
        ...baseOptions,
        ...options
      };
      return $.cloudinary.url(cloudinaryId, finalOptions);
    }
    return 'https://placehold.it/50x50';
  },
  getThumb(cloudinaryId) {
    if (cloudinaryId) {
      return $.cloudinary.url(cloudinaryId, {
        width: 150,
        height: 150,
        crop: 'thumb',
        gravity: 'face'
      });
    }
    return '/img/unknown-user.png';
  },
  aboutBox(cloudinaryId) {
    if (cloudinaryId) {
      return $.cloudinary.url(cloudinaryId);
    }
    return '/img/not-found.png';
  },
  getFetchImage(url) {
    if (url) {
      return $.cloudinary.url(url, {
        width: 400,
        height: 400,
        crop: 'fill',
        gravity: 'center',
        type: 'fetch'
      });
    }
    return 'https://placehold.it/400x400';
  },
  getS3MappingFolder: function(cloudinaryId, collectionName) {
    if (!cloudinaryId) return '';
    if (!Meteor.settings.public.cloudinary.s3MappingFolder) throw new Error('Must configure s3mappingFolder');
    return `${Meteor.settings.public.cloudinary.s3MappingFolder}/${collectionName}/${cloudinaryId}`;
  }
};

//  TODO: Refatorar para usar o CloudinaryHelpers
Template.registerHelper('getCloudinaryCard', Cloudinary.helpers.getCard);
Template.registerHelper('getCloudinaryMiniCard', Cloudinary.helpers.getMiniCard);
Template.registerHelper('getUserThumb', Cloudinary.helpers.getThumb);
Template.registerHelper('getCloudinaryFetchImage', Cloudinary.helpers.getFetchImage);
//  ----

Template.registerHelper('CloudinaryHelpers', () => Cloudinary.helpers);

Template.registerHelper('s3pathImages', (cloudinaryId) => {
  return Cloudinary.helpers.getS3MappingFolder(cloudinaryId, 'images');
});

Template.registerHelper('s3pathFiles', (cloudinaryId) => {
  return Cloudinary.helpers.getS3MappingFolder(cloudinaryId, 'files');
});