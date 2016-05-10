var MoModel = Backbone.Model.extend({
	defaults: {
		idPost  	:0,
		idCategoria	:0,
		idEspecial	:0,
		titulo 		:'',
		texto 		:'',
		ubicacion	:'',
		foto 		:'',
		link 		:'',
		orden 		:0,
		idAutor		:0,
		fecha		:(new Date()).toShortDate(),
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
		el: '#posts',
		events: {
			'click .btn-anuncios' :'click_anuncios',
			'click .btn-fotos' :'click_fotos',
		},
		initialize: function() {
			var that = this;

			this.pk = 'idPost';
			this.url = '/posts';
			this.model = MoModel;

			this.fks = {
				idEspecial: {
					url: 'especiales',
					where:[{field:'activo', value:1}]
				},
				idAutor: {
					url: 'autores',
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

			// *******************************CUSTOM SAVE***************************
			this.popSave = this.$el.find('.modal-save');
			this.popAction = new ViPopAction({url:this.url, pk:this.pk, parentView:this, el:this.popSave});


			this.extras = {
				clean: ['titulo', 'texto', 'foto', 'link', 'orden','ubicacion'],
				includes: ['autor', 'especial'],
			};
			var columns = [
				{nombre:'Titulo', field:'titulo', width:300},
				{nombre:'Seccion', field:'especial', width:200, tmp:'{{nombre}}', join:{table:'especiales', field:'nombre'}},
				{nombre:'Autor', field:'autor', width:300, tmp:'{{nombre}}', join:{table:'autores', field:'nombre'}},
				{nombre:'Fecha', field:'fecha', width:200},				
			];
			viewsBase.abc.prototype.initialize.call(this, columns, this.popAction);

			this.popAction.mode = {
				SaveAndContinue: true
			};
			delete this.popAction.binds['enter'];
			// ******************************* ANUNCIOS***************************
			this.tmp_anuncios = Handlebars.compile(this.$el.find('.tmp_anuncios').html());
			this.modalAnuncios = this.$el.find('.modal-anuncios');
			this.popAnuncios = new ViAnuncios({el:this.modalAnuncios, parentView:this});




			// ******************************* FOTO***************************
			this.tmp_fotos = Handlebars.compile(this.$el.find('.tmp_fotos').html());
			this.modalFotos = this.$el.find('.modal-fotos');
			this.popFotos = new ViFotos({el:this.modalFotos, parentView:this});
		},
		/*------------------------- Base -----------------------------*/
		render: function() {
			viewsBase.abc.prototype.render.call(this);
		},
		close: function() {
			viewsBase.abc.prototype.close.call(this);
		},
		/*------------------------- Eventos --------------------------*/
		click_anuncios: function(){
			debugger
			var row = this.tbody.find('.isSelected');
			if(row.length == 0)
				app.ut.message({text:'Tiene que seleccionar un registro', tipo:'warning',});
			else {
				debugger
				var model = this.gvGrid.collection.get(row.data('cid'));
				this.popAnuncios.render(model);
			}
		},
		click_fotos: function(){
			debugger
			var row = this.tbody.find('.isSelected');
			if(row.length == 0)
				app.ut.message({text:'Tiene que seleccionar un registro', tipo:'warning',});
			else {
				debugger
				var model = this.gvGrid.collection.get(row.data('cid'));
				this.popFotos.render(model);
			}
		},
	});

	var ViPopAction = viewsBase.popAbc.extend({
		getData: function() {
			debugger
			var json = viewsBase.popAbc.prototype.getData.call(this);
			json.texto = editor.getHTML().replace(/\"/gi, "\\\"");
			return json;
		},
		setData: function(data) {
			debugger
			var json = viewsBase.base.prototype.setData.call(this, data, this.options.parentView.popSave);
			editor.setHTML(data.texto.replace(/\\\"/gi, "\""));
			return json;
		},
		close: function() {
			viewsBase.popAbc.prototype.close.call(this);

			if(this.crud == 2)
				editor.setHTML('');
		},	
	});
	/////////////////////////////////////////POP ANUNCIOS//////////////////////////////////////////////
	var ViAnuncios = Backbone.View.extend({
		events: {
			'click .btn-aceptarAnuncio': 'click_aceptarAnuncio',
			'click .btn-cancelar': 'click_cancelar',
			'click .gvAnuncios tbody .delete' : 'click_deleteAnuncio',
			'change [data-field="principal"]': 'change_principal',
		},
		initialize: function(options) {
			var that = this;
			this.fks = {
				idAnuncio: {
					url: 'anuncios',
					where:[{field:'activo', value:1}],
					filters:[{filter:'titulo'}],
					dKey:'titulo'
				},
			};
			this.gvAnuncios = this.$el.find('.gvAnuncios');
			var tyas = this.$el.find('.tya');
			viewsBase.popAbc.prototype.linkFks.call(this, tyas, this.fks);
			this.formData = this.$el.find('.formAnuncio');
			this.formData.foundation().on('valid.fndtn.abide', function (e) {
				e.preventDefault();
				that.click_save();
			}).on('submit', function (e) {
				e.preventDefault();
			});
		},
	/*-------------------------- Base --------------------------*/
		render: function(data) {
			var that = this;
			this.post = data.attributes.idPost;
			that.click_anunciosAsignados(this.post);
			this.$el.foundation('reveal', 'open');
		},
	/*-------------------------- Eventos --------------------------*/
		click_aceptarAnuncio: function() {
			this.formData.submit();
		},
		click_cancelar: function() {
			this.$el.foundation('reveal', 'close');
		},
		change_principal: function(e) {
			var that = this;
			var principal= 0;
			var valor = $(e.currentTarget).prop("checked");
			var currAnuncio = $(e.currentTarget).data('idpostanuncio');
			debugger
			if (valor)
				principal = 1;
			else 
				principal = 0;

			data = {
					principal: principal,
				};				

			app.ut.request({url:'/posts_anuncios/'+ currAnuncio, data:data, type:'PUT'});
		},
		click_save: function() {
			var that = this;
			var anuncio = this.tyas.tyaidAnuncio.data('fn').current('idAnuncio');
			function done(data) {
				var error = data.data;
				if(app.ut.handleErr(error, true)) {
					app.ut.message({text:'Registro guardado correctamente', tipo:'success',});
					that.click_anunciosAsignados(that.post);
				}
				else {
					app.ut.message({text:'Este anuncio ya fue asignado al articulo seleccionado',});
				}
			}
			data = {
				idPost:that.post,
				idAnuncio:anuncio,
				principal: 0,
			};			
			app.ut.request({url:'/posts_anuncios', data:data, done:done, type:'POST'});

		},
		click_anunciosAsignados: function (post) {
			var that = this;
			var currPost = post;
			debugger
			function done(data) {
				if (data.length > 0 ) {
					var tr = that.options.parentView.tmp_anuncios({datos:data});
					that.gvAnuncios.html(tr);
				}
				else {
					var Clean = "";
					that.gvAnuncios.html(Clean);
				}
			}
			app.ut.request({url:'/posts_anuncios', data:{where:{idPost:currPost}, includes:[{table:'anuncio'}]}, done:done, type:'GET'});
		},
		click_deleteAnuncio: function(e) {
			var that = this;
			var currAnuncio = $(e.currentTarget).data('idpostanuncio');
			var currPost = that.post;
			debugger
			function done(data) {
				that.click_anunciosAsignados(currPost);
			}
			app.ut.request({url:'/posts_anuncios/' + currAnuncio ,done:done, type:'DELETE'})
		},
	});
	/////////////////////////////////////////POP FOTOS//////////////////////////////////////////////
	var ViFotos = Backbone.View.extend({
		events: {
			'click .btn-aceptarFoto': 'click_aceptarFoto',
			'click .btn-cancelar': 'click_cancelar',
			'click .gvFotos tbody .delete' : 'click_deleteFoto',
		},
		initialize: function(options) {
			var that = this;
			this.fks = {
				idGaleria: {
					url: 'galerias',
					where:[{field:'activo', value:1}],
					filters:[{filter:'titulo'}],
					dKey:'titulo'
				},
			};
			this.gvFotos = this.$el.find('.gvFotos');
			var tyas = this.$el.find('.tya');
			viewsBase.popAbc.prototype.linkFks.call(this, tyas, this.fks);
			this.formData = this.$el.find('.formFoto');
			this.formData.foundation().on('valid.fndtn.abide', function (e) {
				e.preventDefault();
				that.click_save();
			}).on('submit', function (e) {
				e.preventDefault();
			});
		},
	/*-------------------------- Base --------------------------*/
		render: function(data) {
			var that = this;
			this.post = data.attributes.idPost;
			that.click_fotosAsignadas(this.post);
			this.$el.foundation('reveal', 'open');
		},
	/*-------------------------- Eventos -----------------------*/
		click_aceptarFoto: function() {
			this.formData.submit();
		},
		click_cancelar: function() {
			this.$el.foundation('reveal', 'close');
		},
		click_save: function() {
			var that = this;
			var foto = this.tyas.tyaidGaleria.data('fn').current('idGaleria');
			function done(data) {
				var error = data.data;
				if(app.ut.handleErr(error, true)) {
					app.ut.message({text:'Registro guardado correctamente', tipo:'success',});
					that.click_fotosAsignadas(that.post);
				}

				else {
					app.ut.message({text:'Esta Foto ya fue asignada al articulo seleccionado',});
				}
			}
			data = {
				idPost:that.post,
				idGaleria:foto,
			};
			debugger
			app.ut.request({url:'/posts_fotos', data:data, done:done, type:'POST'});

		},
		click_fotosAsignadas: function (post) {
			var that = this;
			var currPost = post;
			debugger
			function done(data) {
				if (data.length > 0 ) {
					var tr = that.options.parentView.tmp_fotos({datos:data});
					that.gvFotos.html(tr);
				}
				else {
					var Clean = "";
					that.gvFotos.html(Clean);
				}
			}
			app.ut.request({url:'/posts_fotos', data:{where:{idPost:currPost}, includes:[{table:'galeria'}]}, done:done, type:'GET'});
		},
		click_deleteFoto: function(e) {
			var that = this;
			var currGaleria = $(e.currentTarget).data('galeria');
			var currPost = that.post;
			debugger
			function done(data) {
				that.click_fotosAsignadas(currPost);
			}
			app.ut.request({url:'/posts_fotos/' + currGaleria ,done:done, type:'DELETE'})
		},
	});
	return {view: ViMain};
});
