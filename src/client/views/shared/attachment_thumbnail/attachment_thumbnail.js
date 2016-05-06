Template.attachmentThumbnail.helpers({
  isImage() {
    let attachment = Template.instance().data.attachment;
    return attachment.file && attachment.file.type.indexOf('image') === 0;
  },
  isFromWeb() {
    return Template.instance().data.attachment.from === 'web';
  },
  optionsFetch() {
    return {
      type: 'fetch'
    };
  },
  options() {
    let className = Template.instance().data.class;
    if (className === 'small') return { width: 60, height: 60 };
    if (className === 'preview') return { width: 400, height: 400 };
    if (className === 'card') return { width: 600, height: 400 };
    return {};
  },
  classIconName() {
    switch (this.attachment.file.type) {
      case 'application/pdf':
        return 'fa-file-pdf-o';
      case 'application/zip':
        return 'fa-file-archive-o';

      case 'image/jpg':
      case 'image/png':
      case 'image/jpeg':
        return 'fa-file-image-o';

      default:
        return 'fa-file-o';
    }
  }
});
