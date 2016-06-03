import { Images } from '/imports/api/images/images';

Cloudinary.config({
  cloud_name: Meteor.settings.public.cloudinary.name,
  api_key: process.env.CLOUDINARY_ACCESS_KEY_ID,
  api_secret: process.env.CLOUDINARY_SECRET_ACCESS_KEY,
});

/*global.Imags = Images;*/
