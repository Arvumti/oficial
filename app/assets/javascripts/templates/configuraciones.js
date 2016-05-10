define(['/assets/base/viewsBase.js'], function (viewsBase) {
	/*
		columns: columnas del grid
		model: modelo [opcional]
		pk: primary key
		url: ruta del api
	*/
	var ViMain = viewsBase.base.extend({
		el: '#configuraciones',
		events: {
			'click .btn-save': 'click_btnsave',
		},
		initialize: function() {
			this.rConf = {
				foto: {
					idKey: 1,
					pk: 'idConfiguracion',
					table: 'configuraciones',
				},
			};
			this.rElems = this.$el.find('.up-foto');
			this.remotes = this.linkRemote(this.rElems, this.rConf);

			this.formData = this.$el.find('.form-data');
		},
		/*-------------------------- Base --------------------------*/
		render: function(data) {
			var that = this;
			viewsBase.base.prototype.render.call(this, data);

			function done(data) {
				if(data && data.length > 0)
					that.setData(data[0], that.formData);
			}
			app.ut.request({url:'/configuraciones', data:{where:{idConfiguracion:1}}, done:done});
		},
		/*-------------------------- Eventos --------------------------*/
		click_btnsave: function() {
			debugger
			var json = this.getData(this.formData);

			function done(data) {
				debugger
				if(app.ut.handleErr(data, true)) {
					app.ut.message({text:'Informacion guardada correctamente', tipo:'success'});
				}
			}
			app.ut.request({url:'/configuraciones/1', data:json, done:done, type:'PUT'});
		},
	});
	return {view: ViMain};
});