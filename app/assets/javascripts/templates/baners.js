var MoModel = Backbone.Model.extend({
	defaults: {
		idBaner  	:0,
		titulo 		:'',
		subtitulo 	:'',
		texto 		:'',
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
		el: '#baners',
		events: {},
		initialize: function() {
			var that = this;
			
			this.pk = 'idBaner';
			this.url = '/baners';
			this.model = MoModel;

			this.rConf = {
				foto: {
					type: 'passive',
					pk: that.pk,
					table: that.url.replace('/', ''),
				},
			};

			this.extras = {
				clean: ['titulo', 'subtitulo', 'texto', 'foto'],
			};

			var columns = [
				{nombre:'Titulo', field:'titulo', width:500},
				{nombre:'SubTitulo', field:'subtitulo', width:380},
				{nombre:'Vigencia', field:'vigencia', width:120},
			];
			viewsBase.abc.prototype.initialize.call(this, columns);

			this.popAction.mode = {
				SaveAndContinue: true
			};
		},
	});
	return {view: ViMain};
});