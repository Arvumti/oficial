var MoModel = Backbone.Model.extend({
	defaults: {
		idEspecialDetalle :0,
		idEspecial	:0,
		longitud	:'',
		latitud		:'',
		texto 		:'',
		nombre 		:'',
		foto 		:'',
		activo 		:1,		
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
		el: '#secciones_articulos',
		events: {			
		},
		initialize: function() {
			var that = this;

			this.pk = 'idEspecialDetalle';
			this.url = '/especiales_detalles';
			this.model = MoModel;

			this.fks = {
				idEspecial: {
					url: 'especiales',
					where:[{field:'activo', value:1}],
					filters:[{filter:'titulo'}],
					dKey:'titulo'
				},				
			};

			var tyas = this.$el.find('.tya');
			viewsBase.popAbc.prototype.linkFks.call(this, tyas, this.fks);

			this.rConf = {
				foto: {
					type: 'passive',
					pk: that.pk,
					table: that.url.replace('/', ''),
				},
			};

			this.extras = {
				clean: ['latitud', 'longitud', 'texto', 'nombre', 'foto'],
				includes: ['especial'],
			};
			var columns = [
				{nombre:'Nombre', field:'nombre', width:500},
				{nombre:'Seccion', field:'especial', width:250, tmp:'{{titulo}}', join:{table:'especiales', field:'titulo'}},				
				{nombre:'Vigencia', field:'vigencia', width:250},				
			];
			viewsBase.abc.prototype.initialize.call(this, columns);

			this.popAction.mode = {
				SaveAndContinue: true
			};
			delete this.popAction.binds['enter'];
		},
		/*------------------------- Base -----------------------------*/
		render: function() {
			viewsBase.abc.prototype.render.call(this);
		},
		close: function() {
			viewsBase.abc.prototype.close.call(this);
		},
		/*------------------------- Eventos --------------------------*/		
	});
	return {view: ViMain};
});
