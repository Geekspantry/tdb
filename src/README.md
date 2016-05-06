# TDB  [![Code Climate](https://codeclimate.com/github/envisioning/techdb/badges/gpa.svg)](https://codeclimate.com/github/envisioning/techdb)

| Branch       | Status                |
|------------------------------|---------------------------------------------------------------------|
| master         | [![Codeship Status for envisioning/tdb](https://codeship.com/projects/878e70d0-c82e-0133-dc26-1aeb7925fee8/status?branch=master)](https://codeship.com/projects/139232)|
| staging            | [![Codeship Status for envisioning/tdb](https://codeship.com/projects/878e70d0-c82e-0133-dc26-1aeb7925fee8/status?branch=staging)](https://codeship.com/projects/139232)|


A fresh start. Reboot on 11.23.2015.


## Installation

### Environment Dependencies

Create a `.env` file on the project root with the following variables. To add the environment variables we are using the [meteor-dotenv](https://github.com/okgrow/meteor-dotenv) package.

| Environment Variable         | Description                                                                        |
|------------------------------|------------------------------------------------------------------------------------|
| AWS_ACCESS_KEY_ID            | Used for file uploads - http://aws.amazon.com                                      |
| AWS_SECRET_ACCESS_KEY        | Used for file uploads - http://aws.amazon.com                                      |
| AWS_S3_BUCKET                | Used for file uploads - http://aws.amazon.com                                      |
| AWS_S3_FOLDER                | Used for file uploads - http://aws.amazon.com                                      |
| AWS_S3_REGION                | Used for file uploads - http://aws.amazon.com                                      |
| CLOUDINARY_ACCESS_KEY_ID     | Used for transform images - http://cloudinary.com                                  |
| CLOUDINARY_SECRET_ACCESS_KEY | Used for transform images - http://cloudinary.com                                  |
| MAIL_URL                     | SMTP for sending emails - https://mailgun.com                                      |
| ELASTICSEARCH_URL            | ElasticSearch server - http://searchly.com                                         |
| KADIRA_APP_ID                | Performance monitoring - https://kadira.io                                         |
| KADIRA_APP_SECRET            | Performance monitoring - https://kadira.io                                         |
| MONGO_URL                    | MongoDB connection string                                                          |

### Local Packages Dependencies

We use some some packages that are not avaliable on atmosphere, so we use [mgp](https://github.com/DispatchMe/mgp) to fetch this dependencies.

First install the `mgp` with npm.

```bash
> npm install -g mgp
```

Then go to the project root and run:

```bash
> mgp
```

## Reusable Components
- [recentUpdates](https://github.com/envisioning/techdb/tree/master/client/views/shared/recent_updates)
- [smartInputFile](https://github.com/envisioning/techdb/tree/master/client/views/shared/smart_input_file)
- [searchRemoteFile](https://github.com/envisioning/techdb/tree/master/client/views/shared/search_remote_file)
- [searchMetadata](https://github.com/envisioning/techdb/tree/master/client/views/shared/search_metadata)
- [searchSource](https://github.com/envisioning/techdb/tree/master/client/views/shared/search_source)



## Tracking fields with Elastic Search

Simply use ```esDriver: true``` on your SimpleSchema keys that you want to river to ElasticSearch.
Only updates on those fields will trigger the river.

**lib**
```js
Schemas.Organization = new SimpleSchema({
  name: {
    type: String,
    esDriver: true
  },
...
}
```

**server**

Tell `Mongo.Collection` to use `esDriver`, passing an elasticsearch client instance. The **index** and the **type**. 

You can optionally pass a function to transform the `doc` before sending it to elasticsearch. In this function you can access the `cleanedDoc` (filtered doc excluding fields that does not have `esDriver: true`, the original `do`c and a reference to the `hook` function who called this action)
> Should only exist on server since client does not know about elastic search

```js
Organizations.esDriver(esClient, 'techdb', 'organizations', (cleanedDoc, doc, hook) => {
 // return doc
});
```

**Notes**:
- We must wrap the elasticSearch.Client method's with Async.wrap so we can call the asynchronous methods on a synchronous way
- We should make docTransformer a pure function: it must not change the original doc object, since other adapters may utilize this doc as well. Instead, we must make a copy, mutate and return it

> **Attention**: TDB currently supports ElasticSearch 2.1

## Tracking collection operations

Simply use `logDriver: true` on your SimpleSchema keys that you want to watch for updates.

```javascript
Schemas.Organization = new SimpleSchema({
  name: {
    type: String,
    esDriver: true,
    logDriver: true
  },
  ...
}
```
Then tell `Mongo.Collection` to use `logDriver`, passing the **collection** where you want to store the Logs and a function that returns how should the `doc` be identified. Attaching this to the Collection makes it log `insert`, `remove` and `update` operations.

```js
Meteor.users.logDriver(Logs, (doc, hook) => {
  let tDoc = hook.transform();
  return tDoc.identification(['username', 'email', 'fullName']);
});
```

**TODO**
- We must provide a way to specify a custom text for each operation



