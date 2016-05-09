/*TabularTables.Projects = new Tabular.Table({
  name: 'ProjectsList',
  collection: Projects,
  sub: new SubsManager(),
  pub: 'tabularProjectsList',
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id'],
  columns: [{
    title: 'Name',
    data: 'name',
    width: '90%'
  }, {
    title: 'Actions',
    tmpl: Meteor.isClient && Template.projectsActions,
    width: '10%'
  }],
  bPaginate: true
});
*/