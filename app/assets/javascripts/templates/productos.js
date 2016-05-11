var MoModel = Backbone.Model.extend({
	defaults: {		
		idProducto	:0,		
		idCategoria	:0,		
		foto 		:'',
		nombre 		:'',
		descripcion	:'',		
		oferta 		:0,
		precio		:0,
		activo		:1,
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
		el: '#productos',
		events: {
			'click .btn-anuncios' :'click_anuncios',
			'click .btn-fotos' :'click_fotos',
		},
		initialize: function() {
			var that = this;

			this.pk = 'idProducto';
			this.url = '/productos';
			this.model = MoModel;

			this.fks = {
				idCategoria: {
					url: 'categorias',
					where:[{field:'activo', value:1}]
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
				clean: ['nombre', 'descripcion', 'foto', 'precio', 'oferta'],
				includes: ['categoria'],
			};
			var columns = [
				{nombre:'Nombre', field:'nombre', width:500},
				{nombre:'Categoria', field:'categoria', width:250, tmp:'{{nombre}}', join:{table:'categorias', field:'nombre'}},				
				{nombre:'Vigencia', field:'vigencia', width:250},				
			];
			viewsBase.abc.prototype.initialize.call(this, columns, this.popAction);

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
