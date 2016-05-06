CollectionsSet.after.insert(function(userId, doc) {
  let projectId = doc.projectId;
  Projects.update({
    _id: projectId
  }, {
    $inc: {
      collectionsSetCount: 1
    }
  });
});

CollectionsSet.after.remove(function(userId, doc) {
  let projectId = doc.projectId;
  Projects.update({
    _id: projectId
  }, {
    $inc: {
      collectionsSetCount: -1
    }
  });
});
