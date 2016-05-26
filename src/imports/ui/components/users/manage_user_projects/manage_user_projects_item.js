import { Template } from 'meteor/templating';
import './manage_user_projects_item.html';
import { addProject, removeProject } from '/imports/api/users/methods';

Template.manageUserProjectsItem.helpers({
  inProject() {
    let userId = Template.instance().data.userId;
    let inProject = Meteor.users.findOne({
      _id: userId,
      projectsId: this._id
    });

    return inProject;
  },
});

Template.manageUserProjectsItem.events({
  'click .add-project': function(e, t) {
    addProject.call({ userId: t.data.userId, projectId: this._id }, (err, res) => {
      if (err) {
        toastr.error(err.toString(), 'Error');
        return;
      }
      toastr.success('Project added to user', 'Success');
    });
  },
  'click .remove-project': function(e, t) {
    removeProject.call({ userId: t.data.userId, projectId: this._id }, (err, res) => {
      if (err) {
        toastr.error(err.toString(), 'Error');
        return;
      }
      toastr.success('Project removed from user', 'Success');
    });
  }
});
