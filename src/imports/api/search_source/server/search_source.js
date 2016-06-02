import esClient from '/imports/api/elastic_search/es_client';


function processSearchResults(searchResults) {
  let results = _.map(searchResults.hits.hits, function(hit) {
    return _.extend(hit._source, {
      _id: hit._id,
      _type: hit._type,
      _score: hit._score,
      _highlight: hit.highlight
    });
  });

  return {
    results: results,
    total: searchResults.hits.total,
    took: searchResults.took
  };
}


/**
 * SearchSouce globalSearch
 * get data from any source (in this case, esEngine)
 *
 * options:
 * @from {Integer} defines the offset from the first result you want to fetch
 * @size {Integer} allows you to configure the maximum amount of hits to be returned
 * @nameBoost {Integer} the weight of Name on the calculation of relevance
 * @nameFuzziness {Integer} Name's level of fuzziness
 * @descriptionBoost {Integer} the weight of Description/Description.longText on the calculation of relevance
 * @descriptionFuzziness {Integer} Description/DEscription.longText 's level of fuzziness
 * returns:
 * {object}
 *  @data -> results
 *  @metadata -> total, took
 */

SearchSource.defineSource('globalSearch', function(searchText, {
  from = 0,
  size = 8,
  types = [],
  nameBoost = 100,
  nameFuzziness = 2,
  descriptionBoost = 1,
  descriptionFuzziness = 1,
  techStatus = '',
  techIdBoost = 200,
  excludeIds = []
}) {
  searchText = searchText.toLowerCase();
  let words = searchText.trim().split(' ');
  let lastWord = words[words.length - 1] || '';

  let query = {
    bool: {
      must: [ //  At least one must match
        {
          bool: {
            should: [ // Any of these conditions should match, the most, more relevant
              {
                match: { // Tech Id
                  techId: {
                    query: searchText,
                    boost: techIdBoost
                  }
                }
              }, {
                prefix: {
                  techId: {
                    value: lastWord,
                    boost: techIdBoost
                  }
                }
              }, {
                match: { // Name
                  name: {
                    query: searchText,
                    boost: nameBoost
                  }
                }
              }, {
                prefix: {
                  name: {
                    value: lastWord,
                    boost: nameBoost
                  }
                }
              }, {
                match: { // Description
                  description: {
                    query: searchText,
                    boost: descriptionBoost
                  }
                }
              }, {
                prefix: {
                  description: {
                    value: lastWord,
                    boost: descriptionBoost
                  }
                }
              },
            ]
          }
        }
      ],
      should: [{
        match_phrase_prefix: {
          name: {
            query: searchText,
            boost: nameBoost,
            slop: 5
          }
        }
      }, {
        match_phrase_prefix: {
          description: {
            query: searchText,
            boost: descriptionBoost,
            slop: 5
          }
        }
      }, ]
    }
  };

  let filter = {
    bool: {}
  };
  let mustQ = [];
  let mustNotQ = [];


  if (techStatus) {
    mustQ.push({
      term: {
        status: techStatus
      }
    });
  }

  if (excludeIds) {
    mustNotQ.push({
      ids: {
        values: excludeIds
      }
    });
  }

  if (mustQ) {
    filter.bool.must = mustQ;
  }

  if (mustNotQ) {
    filter.bool.must_not = mustNotQ;
  }
  // //if (excludeIds.length) {
  // // must_not: [{
  // //   ids: {
  // //     values: excludeIds
  // //   }
  // // }],
  // // must: [{
  // //   term: {
  // //     status: techStatus
  // //   }
  // // }]
  //   filter = {
  //     bool: {}
  //   };
  //  }


  let finalQuery = {
    filtered: {
      filter: filter,
      query: query
    }
  };

  let syncSearch = Async.wrap(esClient, 'search');

  let search = syncSearch({
    index: Meteor.settings.public.elasticSearch.index,
    type: types.join(','), // filter types
    body: {
      from: from,
      size: size,
      sort: ['_score', {
        name: {
          order: 'desc'
        }
      }],
      query: finalQuery,
      highlight: {
        pre_tags: ['<em>'],
        post_tags: ['</em>'],
        fields: {
          name: {},
          description: {}
        }
      }
    }
  });

  let processedResults = processSearchResults(search);

  let metadata = {
    total: processedResults.total,
    took: processedResults.took
  };

  return {
    data: processedResults.results,
    metadata: metadata
  };
});

SearchSource.defineSource('userSearch', function(searchText, {
  from = 0,
  size = 8,
  nameBoost = 1,
  emailBoost = 5,
  usernameBoost = 10
} = {}) {
  searchText = searchText.toLowerCase();
  let words = searchText.trim().split(' ');
  let lastWord = words[words.length - 1] || '';

  let query = {
    bool: {
      must: [ //  At least one must match
        {
          bool: {
            should: [ // Any of these conditions should match, the most, more relevant
              {
                match: {
                  'profile.fullName': {
                    query: searchText,
                    boost: nameBoost
                  }
                }
              }, {
                prefix: {
                  'profile.fullName': {
                    value: lastWord,
                    boost: nameBoost
                  }
                }
              }, {
                match: {
                  username: {
                    query: searchText,
                    boost: usernameBoost
                  }
                }
              }, {
                prefix: {
                  username: {
                    value: lastWord,
                    boost: usernameBoost
                  }
                }
              }, {
                match: {
                  'emails.address': {
                    query: searchText,
                    boost: emailBoost
                  }
                }
              }, {
                prefix: {
                  'emails.address': {
                    value: lastWord,
                    boost: emailBoost
                  }
                }
              }
            ]
          }
        }
      ],
      should: [{
        match_phrase_prefix: {
          'profile.fullName': {
            query: searchText,
            boost: nameBoost,
            slop: 5
          }
        }
      }, ]
    }
  };

  let finalQuery = {
    filtered: {
      filter: {},
      query: query
    }
  };

  let syncSearch = Async.wrap(esClient, 'search');

  let search = syncSearch({
    index: Meteor.settings.public.elasticSearch.index,
    type: 'users',
    body: {
      query: finalQuery,
      highlight: {
        pre_tags: ['<b>'],
        post_tags: ['</b>'],
        fields: {
          name: {},
          username: {}
        }
      }
    }
  });

  let processedResults = processSearchResults(search);

  let metadata = {
    total: processedResults.total,
    took: processedResults.took
  };


  return {
    data: processedResults.results,
    metadata: metadata
  };
});
