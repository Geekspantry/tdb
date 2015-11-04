FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn],{except: ['main.index']});

FlowRouter.notFound = {
    action: function() {
    	BlazeLayout.render("plainLayout", {main: "errorPage",errorCode:500});
    }
};

FlowRouter.route('/', {
    name: "main.index",
    title: "Início",
    triggersEnter:[function (context,redirect){
    	if (!Meteor.user()){
    		redirect('/login');
	    }
    }],
    action: function(params) {
    	
	    	BlazeLayout.render("defaultLayout", {main: "dashboard"});

    },

});