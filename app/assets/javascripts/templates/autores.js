var MoModel = Backbone.Model.extend({
	defaults: {
		idAutor  	:0,		
		activo  	:1,		
		nombre 		:'',
		informacion	:'',
		foto 		:'',
		twitter		:'',
		facebook	:'',		
		instagram	:'',
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
		el: '#autores',
		events: {			
		},
		initialize: function() {
			var that = this;

			this.pk = 'idAutor';
			this.url = '/autores';
			this.model = MoModel;		

			this.rConf = {
				foto: {
					type: 'passive',
					pk: that.pk,
					table: that.url.replace('/', ''),
				},
			};

			this.extras = {
				clean: ['nombre', 'informacion', 'foto', 'twitter', 'facebook'],				
			};
			var columns = [
				{nombre:'Nombre', field:'nombre', width:500},				
				{nombre:'Facebook', field:'facebook', width:250},
				{nombre:'Twitter', field:'twitter', width:250},
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
