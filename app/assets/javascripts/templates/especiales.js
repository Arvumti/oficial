var MoModel = Backbone.Model.extend({
	defaults: {
		idEspecial  	:0,
		titulo 		:'',
		nombre 		:'',
		descripcion	:'',
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
		el: '#especiales',
		events: {},
		initialize: function() {
			var that = this;
			
			this.pk = 'idEspecial';
			this.url = '/especiales';
			this.model = MoModel;

			this.rConf = {
				foto: {
					type: 'passive',
					pk: that.pk,
					table: that.url.replace('/', ''),
				},
			};

			this.extras = {
				clean: ['titulo', 'foto'],
			};

			var columns = [
				{nombre:'Nombre', field:'nombre', width:300},
				{nombre:'Titulo', field:'titulo', width:300},
				{nombre:'Descripcion', field:'descripcion', width:300},
				{nombre:'Vigencia', field:'vigencia', width:100},
			];
			viewsBase.abc.prototype.initialize.call(this, columns);

			this.popAction.mode = {
				SaveAndContinue: true
			};
		},
	});
	return {view: ViMain};
});