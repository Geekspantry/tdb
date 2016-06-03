/*TabularTables.Attachments = new Tabular.Table({
  name: 'AttachmentsList',
  collection: Attachments,
  sub: new SubsManager(),
  pub: 'tabularAttachmentsList',
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id'],
  columns: [
    {
      title: 'Name',
      data: 'name',
      width: '50%'
    },
    {
      title: 'Country',
      data: 'country',
      width: '40%'
    },
    {
      title: 'Actions',
      tmpl: Meteor.isClient && Template.attachmentsActions,
      width: '10%'
  }],
  bPaginate: true
});
*/