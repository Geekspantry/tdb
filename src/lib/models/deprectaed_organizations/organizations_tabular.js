/*TabularTables.Organizations = new Tabular.Table({
  name: 'OrganizationsList',
  collection: Organizations,
  sub: new SubsManager(),
  pub: 'tabularOrganizationsList',
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
      tmpl: Meteor.isClient && Template.organizationsActions,
      width: '10%'
  }],
  bPaginate: true
});
*/