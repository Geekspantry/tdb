import { Meteor } from 'meteor/meteor';
import esClient from '/imports/api/elastic_search/es_client.js';
import { ElasticSearchTypeAPI } from '../../elastic_search/lib/elastic_search.js';

let mapping = {
  emails: {
    properties: {
      address: {
        type: 'string'
      }
    }
  },
  profile: {
    properties: {
      address: {
        type: 'string'
      },
      affiliation: {
        type: 'string'
      },
      contactInfo: {
        properties: {
          github: {
            type: 'string'
          },
          phone: {
            type: 'string'
          },
          skype: {
            type: 'string'
          },
          slack: {
            type: 'string'
          },
          twitter: {
            type: 'string'
          }
        }
      },
      country: {
        type: 'string'
      },
      fullName: {
        type: 'string'
      },
      imageId: {
        type: 'string'
      }
    }
  },
  roles: {
    type: 'string'
  }
};

let index = Meteor.settings.public.elasticSearch.index;
export const UsersES = new ElasticSearchTypeAPI({
  esClient: esClient,
  index: index,
  type: 'users',
  mongoCollection: Meteor.users,
  mapping: mapping
});
