/**
 * context: {TechnologySchema}
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { AutoForm } from 'meteor/aldeed:autoform';

import { Technologies } from '../../../../api/technologies/technologies';
import { TechnologiesDescriptions } from '../../../../api/technologies_descriptions/technologies_descriptions.js';

import './technologies_descriptions_tabs.html';

Template.technologiesDescriptionsTabs.onCreated(function() {
  this.isEditing = new ReactiveVar;
  this.currentId = new ReactiveVar;

  this.selectLastDescription = () => {
    if (this.data.descriptions().fetch() && this.data.descriptions().fetch().length > 0) {
      this.currentId.set(this.data.descriptions().fetch()[0]._id);
    }
  };

  let template = this;
  TechnologiesDescriptions.find({
    technologyId: this.data._id
  }).observeChanges({
    changed: (id, fields) => {
      const userId = Meteor.userId();
      if (fields.createdBy === userId) {
        template.currentId.set(id);
        template.isEditing.set(true);
      }

      if (fields.updatedBy === userId) {
        template.currentId.set(id);
        template.isEditing.set(false);
      }
    }
  });

  this.selectLastDescription();

  this.autorun(() => {
    if (this.currentId.get()) {
      this.subscribe('technologies_descriptions.single', this.currentId.get());
    }
  });
});

Template.technologiesDescriptionsTabs.events({
  'click [data-action="show-form"]': function(event, template) {
    template.isEditing.set(true);
  },
  'click [data-action="hide-form"]': function(event, template) {
    if (template.isEditing.get()) {
      swal({
        title: 'Are you sure?',
        text: 'Cancel a description <b>editing</b> will discard all your changes.',
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        closeOnConfirm: true,
        html: true
      }, () => {
        template.currentId.set(this._id);
        template.isEditing.set(false);
      });
    } else {
      template.currentId.set(this._id);
      template.isEditing.set(false);
    }
  },
  'click [data-action="switch-tab"]': function(event, template) {
    if (this._id !== template.currentId.get()) {
      if (template.isEditing.get()) {
        swal({
          title: 'Are you sure?',
          text: 'Leaving a description while <b>editing</b> will discart all your changes.',
          type: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          closeOnConfirm: true,
          html: true
        }, () => {
          template.currentId.set(this._id);
          template.isEditing.set(false);
        });
      } else {
        template.currentId.set(this._id);
        template.isEditing.set(false);
      }
    }
  },
  'click [data-action="publish-description"]': function(event, template) {
    swal({
      title: 'Are you sure?',
      text: 'Confirm to publish this description. This will set the current pulished description to <b>draft</b>.',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      closeOnConfirm: true,
      html: true
    }, () => {
      const description = TechnologiesDescriptions.findOne(template.currentId.get());
      const modifier = {
        $set: {
          shortText: template.$('textarea[name="shortText"]').val(),
          longText: template.$('textarea[name="longText"]').val()
        }
      };
      Meteor.call('technologies_descriptions.update', {
        _id: description._id,
        modifier
      }, (updateErr, updateRes) => {
        if (updateErr) {
          toastr.error(updateErr.error, 'Error');
          throw updateErr;
        }
        Meteor.call('technologies_descriptions.publish', {
          technologyId: description.technologyId,
          descriptionId: description._id
        }, (publishErr, publishRes) => {
          if (publishErr) {
            toastr.error(publishErr.error, 'Error');
            throw publishErr;
          }
          template.isEditing.set(false);
          return toastr.success('The description was <b>saved</b> and <b>published</b>!', 'Success');
        });
      });
    });
  },
  'click [data-action="delete-description"]': function(event, template) {
    swal({
      title: 'Are you sure?',
      text: "Confirm to delete this description. This action can't be undone",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#DD6B55',
      closeOnConfirm: true,
      html: true
    }, () => {
      Meteor.call('technologies_descriptions.remove', {
        descriptionId: template.currentId.get()
      }, (err, res) => {
        if (err) {
          toastr.error(err.error, 'Error');
          throw err;
        }
        template.selectLastDescription();
        template.isEditing.set(false);
        return toastr.success('The description was removed', 'Success');
      });
    });
  },
  'click [data-action="copy"]': function (event, template) {
    const currentDescription = TechnologiesDescriptions.findOne(template.currentId.get());

    // Clean properties to be a fresh description
    delete currentDescription._id;
    delete currentDescription.createdAt;
    delete currentDescription.createdBy;
    delete currentDescription.updatedAt;
    delete currentDescription.updatedBy;
    currentDescription.status = 'draft';

    Meteor.call('technologies_descriptions.insert', currentDescription, (err, res) => {
      if (err) {
        console.error(err);
        toastr.error(err.error, 'Error');
      }else {
        toastr.success('The description was copied as draft', 'Success');
      }
    });
  },
});

Template.technologiesDescriptionsTabs.helpers({
  isActive: (_id) => Template.instance().currentId.get() === _id,
  isEditing: () => Template.instance().isEditing.get(),
  isStatusPublished: (status) => status === 'published',
  currentDescription: () => TechnologiesDescriptions.findOne(Template.instance().currentId.get()),
  descriptionsByModifiedAt: () =>
    Template.instance().data
    .descriptions()
    .fetch()
    .sort((previous, next) =>
      next.modifiedAt() - previous.modifiedAt())


});
