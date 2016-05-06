/**
 * context: {TechnologySchema}
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { AutoForm } from 'meteor/aldeed:autoform';

import { Technologies } from '../../../../api/technologies/technologies';
import { TechnologiesDescriptions } from '../../../../api/technologies_descriptions/technologies_descriptions.js';

import { publish, remove, update } from '../../../../api/technologies_descriptions/methods.js';
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
      update.call({
        _id: description._id,
        modifier
      }, (updateErr, updateRes) => {
        if (updateErr) throw updateErr;
        publish.call({
          technologyId: description.technologyId,
          descriptionId: description._id
        }, (publishErr, publishRes) => {
          if (publishErr) throw publishErr;
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
      remove.call({
        descriptionId: template.currentId.get()
      }, (err, res) => {
        if (err) throw err;
        template.selectLastDescription();
        template.isEditing.set(false);
        return toastr.success('The description was removed', 'Success');
      });
    });
  }
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
