/**
 * context: {TechnologySchema}
 */

import { AutoForm } from 'meteor/aldeed:autoform';

import './technologies_status_form.html';

AutoForm.hooks({
  'technologies-status-form': {
    onError(err) {
      toastr.error(err.error);
    },
    onSuccess() {
      toastr.success('Description saved successfully');
    },
  },
});
