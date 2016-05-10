var router = Backbone.Router.extend({
	routes: {
		'' : 'index',
		':mod(/)': 'dynamic',
		':mod/:id(/)': 'dynamic'
	},
	index: function() {
		console.log('---- INDEX ----');
		// try {
		//     app.ut.logging({info:null, tipo:'router', tipo_proc:'info', url:'index'});
		// }
		// catch(ex) {}

		app.currView.close();
	},
	dynamic: function(mod, id) {
		// try {
		//     app.ut.logging({info:null, tipo:'router', tipo_proc:'info', url:mod});
		// }
		// catch(ex) {}

		if(!mod)
			return null;
		app.loadAsync({mod:mod, params_init:{id:id}, params_render:{id:id}});
	},
});

define([], function () {
	return router;
});