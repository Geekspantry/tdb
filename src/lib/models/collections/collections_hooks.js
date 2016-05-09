import { Projects } from '../../../imports/api/projects/Projects';

Collections.after.insert(function(userId, doc) {
  let projectId = doc.projectId;
  Projects.update({
    _id: projectId
  }, {
    $inc: {
      collectionsCount: 1
    }
  });
});

Collections.after.insert(function(userId, doc) {
  let projectId = doc.projectId;
  Projects.update({
    _id: projectId
  }, {
    $inc: {
      collectionsCount: -1
    }
  });
});
