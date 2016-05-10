var MoModel = Backbone.Model.extend({
	defaults: {
		idComentario  	:0,
		titulo 			:'',
		texto 			:'',
		fecha			:(new Date()).toShortDate(),
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
		el: '#comentarios',
		events: {},
		initialize: function() {
			this.pk = 'idComentario';
			this.url = '/comentarios';
			this.model = MoModel;

			this.extras = {
				clean: ['titulo', 'texto'],
			};

			var columns = [
				{nombre:'Titulo', field:'titulo', width:800},
				{nombre:'Fecha', field:'fecha', width:200},
			];
			viewsBase.abc.prototype.initialize.call(this, columns);

			this.popAction.mode = {
				SaveAndContinue: true
			};
		},
	});
	return {view: ViMain};
});