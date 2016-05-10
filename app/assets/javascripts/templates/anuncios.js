var MoModel = Backbone.Model.extend({
	defaults: {
		idAnuncio  	:0,
		titulo 		:'',
		texto 		:'',
		link 		:'',
		foto  		:'',
		vigencia	:(new Date()).toShortDate(),
	}
});

define(['/assets/base/viewsBase.js'], function (viewsBase) {
	/*
		columns: columnas del grid
		model: modelo [opcional]
		pk: primary key
		url: ruta del api
	*/
	var ViMain = viewsBase.abc.extend({
		el: '#anuncios',
		events: {},
		initialize: function() {
			var that = this;

			this.pk = 'idAnuncio';
			this.url = '/anuncios';
			this.model = MoModel;

			this.rConf = {
				foto: {
					type: 'passive',
					pk: that.pk,
					table: that.url.replace('/', ''),
				},
			};

			this.extras = {
				clean: ['titulo', 'texto','link'],
			};

			var columns = [
				{nombre:'Titulo', field:'titulo', width:800},
				{nombre:'Vigencia', field:'vigencia', width:200},
			];
			viewsBase.abc.prototype.initialize.call(this, columns);

			this.popAction.mode = {
				SaveAndContinue: true
			};

			delete this.popAction.binds['enter'];
		},
	});
	return {view: ViMain};
});
