var MoModel = Backbone.Model.extend({
	defaults: {
		idGaleria  	:0,
		idCategoria	:0,
		idEspecial	:0,
		titulo 		:'',
		tipo 		:1,
		activo 		:1,
		video 		:'',
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
		el: '#galerias',
		events: {},
		initialize: function() {
			var that = this;
			
			this.pk = 'idGaleria';
			this.url = '/galerias';
			this.model = MoModel;

			this.fks = {
				idEspecial: {
					url: 'especiales',
					where:[{field:'activo', value:1}]
				},
			};

			this.rConf = {
				foto: {
					type: 'passive',
					pk: that.pk,
					table: that.url.replace('/', ''),
				},
			};

			this.extras = {
				clean: ['titulo', 'texto'],
				includes: ['especial'],
			};

			var columns = [
				{nombre:'Titulo', field:'titulo', width:500},				
				{nombre:'Seccion', field:'especial', width:200, tmp:'{{nombre}}', join:{table:'especiales', field:'nombre'}},				
				{nombre:'Vigencia', field:'vigencia', width:200},
			];
			viewsBase.abc.prototype.initialize.call(this, columns);

			this.popAction.mode = {
				SaveAndContinue: true
			};
		},
	});
	return {view: ViMain};
});