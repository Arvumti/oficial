var ViBase = Backbone.View.extend({
	getData: function(elem_content, deep, context) {
		var seek = '[data-field]:not(.up-foto, input[type="file"], table [data-field], .tt-hint, [type="radio"]),[data-field][type="radio"]:checked';

		if(context == 'table')
			seek = '[data-field]:not(.up-foto, input[type="file"], .tt-hint)';
		else if(context == 'intable')
			seek = '[data-field]:not(.up-foto, input[type="file"], .tt-hint, [type="radio"]),[data-field][type="radio"]:checked';

		var _deep = deep === undefined ? true : deep;
		var datos = elem_content.find(seek),
			json = {};
			debugger

		for(var i=0; i<datos.length; i++) {
			var elem = datos.eq(i),
				info = null;
			
			if(elem.hasClass('tya')) {
				var current = elem.data('current');

				if(current)
					info = current[elem.data('field')];
			}
			else if(elem.hasClass('date')) {
				/*var compose = elem.val().split('-');
				if(compose.length > 0)
					info = new Date(compose[1] + '-' + compose[0] + '-' + compose[2]);

				if(info == 'Invalid Date')
					info = null;
				else
					info = info.toLocaleDateString();*/
				info = elem.val();
			}
			else if(elem.hasClass('table')) {
				var trs = elem.find('tbody tr');

				var tmpInfo = json[elem.data('field')];
				var contin = tmpInfo instanceof Array;

				info = contin ? tmpInfo : Array();

				for (var j = 0; j < trs.length; j++) {
					var jTr = ViBase.prototype.getData.call(this, trs.eq(j), true, 'table');
					if(!_.isEmpty(jTr))
						info.push(jTr);
					//info.push(trs.eq(j).data('row'));
				}

				if(contin)
					continue;
			}
			// else  if(elem.hasClass('upload') || elem.hasClass('up-foto')) {
			// 	info = elem.data('fn').getUrl();
			// }
			else if(elem[0].type == 'checkbox')
				info = elem.prop('checked') ? 1 : 0;
			else if(elem.prop('nodeName') == 'SPAN')
				info = elem.data('value') || elem.text();
			else
				info = elem.val();
		
			json[elem.data('field')] = info;
		}
		return json;
	},
	setData: function(data, form, context) {
		debugger
		for(var name in data) {
			var seek = '[data-field="'+name+'"]:not(input[type="file"], table [data-field], .tt-hint)';

			if(context == 'table')
				seek = '[data-field="'+name+'"]:not(input[type="file"], span, .tt-hint)';
			else if(context == 'intable')
				seek = '[data-field="'+name+'"]:not(input[type="file"], .tt-hint)';

			var elem = form.find(seek);
			
			if(elem.length > 0) {
				if(elem.hasClass('tya')) {
					var tyaData = {};
					var include = elem.data('include');
					tyaData = data[include];

					if(tyaData) {
						var templateG = elem.data('fn').template,
							dKey;

						if(templateG)
							dKey = templateG(tyaData);
						else
							dKey = tyaData[elem.data('dKey')];

						tyaData = _.defaults({dKey:dKey}, tyaData);
						elem.data('current', tyaData).val(tyaData.dKey).blur();
					}
					else
						elem.data('current', null).val('').blur();
				}
				else if(elem.hasClass('date')) {
					var strFecha = data[name],
						fecha;
					if(strFecha == null) {
						elem.val('');
						continue;
					}

					if(typeof strFecha == 'string') {
						fecha = strFecha.toShortDate();
						elem.val(fecha);
						continue;
					}
					
					fecha = new Date(strFecha);
					if(fecha == 'Invalid Date')
						elem.val('');
					else {
						var dia = fecha.getDate().toString(),
							mes = (parseInt(fecha.getMonth().toString()) + 1).toString(),
							anio = fecha.getFullYear().toString();

						var str_fecha = (dia.length == 1 ? '0' + dia : dia) + '-' + (mes.length == 1 ? '0' + mes : mes) + '-' + anio;
						elem.val(str_fecha);
					}
				}
				else if(elem.hasClass('table')) {
					var setLink = elem.data('setlink');
					var setFind = elem.data('setfind');
					var setInit = elem.data('setinit') || 0;
					var json = _.clone(data);
					if(setLink) {
						var where = elem.data('setwhere');
						json[elem.data('field')] = _.filter(json[elem.data('field')], function(item){ 
							return item[setLink].toString() == where.toString();
						});
					}
					var trs = elem.find('tbody tr');

					var tmpInfo = json[elem.data('field')];
					var contin = tmpInfo instanceof Array;

					if(contin && tmpInfo.length == 0)
						continue;

					var lenArr = tmpInfo.length;
					var lenTrs = trs.length;

					if(setFind)
						for (var j = 0; j < trs.length; j++) {
							var findWhere = Object();
							findWhere[setFind] = j + setInit;
							var row = _.findWhere(tmpInfo, findWhere);
							if(row === undefined) {
								findWhere[setFind] = (j + setInit).toString();
								row = _.findWhere(tmpInfo, findWhere);
							}

							if(row !== undefined)
								ViBase.prototype.setData.call(this, row, trs.eq(j), 'table');
						}
					else
						for (var j = 0; j < tmpInfo.length; j++) {
							if(lenTrs < j)
								break;
							ViBase.prototype.setData.call(this, tmpInfo[j], trs.eq(j), 'table');                 
						}
				}
				else  if(elem.hasClass('upload') || elem.hasClass('up-foto')) {
					if(data[name])
						elem.data('fn').setConf({url:data[name]});
				}
				else if(elem[0].type == 'checkbox') {
					if(elem.length > 1) {
						var subelem = $(_.findWhere(elem, {value:data[name].toString()}));
						subelem.prop('checked', true);
					}
					else
						elem.prop('checked', data[name].toString().toInt());
				}
				else if(elem[0].type == 'radio') {
					var relem = _.find(elem, function(item) { return item.value == data[name]});
					if($(relem).length == 1)
						$(relem).prop('checked', true);
				}
				else if(typeof data[name] === 'object')
					elem.val('');
				else
					elem.val(data[name]);
			}
		}
	},
	render: function(data){
		app.ut.bind(this);
		this.$el.removeClass('is-hidden');
	},
	close: function() {
		this.$el.addClass('is-hidden');
	},
	linkRemote: function(remotes, configs) {
		var arrRemotes = Object();
		for (var i = 0; i < remotes.length; i++) {
			var elem = remotes.eq(i);
			var field = elem.data('field');
			var config = configs[field];
			config.elem = elem;
			config.field = field;

			arrRemotes[field] = app.ut.linkFoto(config);
		}

		return arrRemotes;
	},
});

/*
	columns: columnas del grid
	model: modelo [opcional]
	pk: primary key
	url: ruta del api
*/
var ViABC = Backbone.View.extend({
	binds: {
		'enter' : 'key_enter',
		'del'   : 'key_del',
		'down'  : 'key_down',
		'f2'    : 'click_f2',
		'up'    : 'key_up',
	},
	/*-------------------------- Key --------------------------*/
	key_enter: function() {
		this.click_modificar();
	},
	key_del: function() {
		this.click_eliminar();
	},
	key_down: function() {
		this.gvGrid.click_onTrDown();
	},
	click_f2: function() {
		this.click_nuevo();
	},
	key_up: function() {
		this.gvGrid.click_onTrUp();
	},
	/*-------------------------- Base --------------------------*/
	initialize: function(columns, popAction, specials) {
		this.gvDatosEl = this.$el.find('.gvDatos');
		
		this.model || (this.model = app.models.moRow);
		this.extras || (this.extras = {locked:[], clean:[]});

		var command = {select: false},
			extras = {
				select: true,
				primaryKey: this.pk,
				includes: this.extras.includes,
			};

		specials = specials || Array();
		var hasActivo = _.findWhere(specials, {field:'activo'});
		if(!hasActivo) {
			specials.push({field:'activo', value:1});
		}

		this.specials = specials;

		this.gvGrid = new app.controles.grid({model:this.model, columns:columns, command:command, extras:extras, specials:specials, url:'/controles/grid?model=' + this.url.replace('/', ''), el:this.gvDatosEl});
		
		this.tbody = this.gvDatosEl.children('tbody');

		if(!popAction) {
			this.popSave = this.$el.find('.modal-save');
			this.popAction = new ViPopSaveABC({url:this.url, pk:this.pk, parentView:this, el:this.popSave});
		}
	  
		this.events['click .btn-nuevo'] = 'click_nuevo';
		this.events['click .btn-modificar'] = 'click_modificar';
		this.events['click .btn-eliminar'] = 'click_eliminar';
		this.events['click .btn-excel'] = 'click_excel';

		this.$el.foundation();
	},
	render: function(data){
		this.$el.removeClass('is-hidden');
	},
	addRow: function(data){
		var model;
		switch(data.crud) {
			case 1:
				for(var key in data) {
					if(typeof data[key] === 'object')
						continue;
					data[key] = (data[key] || '').toString();
				}
				var mrow = new this.model(data);
				model = this.gvGrid.addTR(mrow);
				break;
			case 2:
				model = this.gvGrid.modifyTR(data);
				break;
		}
		return model;
	},
	close: function() {
		this.$el.addClass('is-hidden');
	},
	/*-------------------------- Eventos --------------------------*/
	click_nuevo: function() {
		this.popAction.render({crud:1});
	},
	click_modificar: function() {
		debugger
		var row = this.tbody.find('.isSelected');
		if(row.length == 0)
			app.ut.message({text:'Tiene que seleccionar un registro' ,tipo:'warning',});
		else {
			var model = this.gvGrid.collection.get(row.data('cid'));
			this.popAction.render({crud:2, model:model});
		}
	},
	click_eliminar: function() {
		var that = this,
			row = this.tbody.find('.isSelected');
		if(row.length == 0)
			app.ut.message({text:'Tiene que seleccionar un registro' ,tipo:'warning',});
		else {
			var model = this.gvGrid.collection.get(row.data('cid'));
			popConfirm.render(function() {
				app.ut.request({url:that.url + '/' + row.data('pkey'), data:{model:model.toJSON()}, done:done, type:'DELETE'});
		
				function done(data) {
					popConfirm.click_cancelar();
					that.gvGrid.collection.remove(model, {silent:true});
					row.remove();
				}
			});
		}
	},
	click_excel: function() {
		var modelo = this.url.replace('/', '');
		var where = Object();
		if(this.specials instanceof Array) {
			for (var i = 0; i < this.specials.length; i++) {
				var to = this.specials[i].to;
				if(to)
					where[this.specials[i].field] = {to:to};
				else
					where[this.specials[i].field] = this.specials[i];
			}
		}
		app.views.main.csv({modelo:modelo, where:where});
	},
});

var ViPopSaveABC = Backbone.View.extend({
	binds: {
		'ctrl+enter': 'key_save',
		'escape'    : 'key_close',
		'enter'     : 'key_enter',
	},
	events: {
		'click .btn-aceptar'    : 'click_aceptar',
		'click .btn-cancelar'   : 'click_cancelar',
		//'keyup .form-data' : 'keyup_pop',
	},
	initialize: function(data) {
		var that = this;

		this.on_save = false;
		this.modelBase = new data.parentView.model();
		this.mode = {
			SaveAndContinue: false,
			getPlantel: false,
			upload: false,
		};

		this.parentView = data.parentView;
			
		this.url = data.url;
		this.form = this.$el.find('form');     
		
		this.thead = this.$el.children('.pop-head');
		this.tbody = this.$el.children('.pop-body');
		
		this.crud = 1;
		this.pk = data.pk;
		
		//this.form.find('.date').fdatepicker({format: 'dd-mm-yyyy', language: 'es'});

		var tyas = this.form.find('.tya');
		/*for (var i = 0; i < tyas.length; i++) {
			var fk = this.parentView.fks[tyas.eq(i).data('field')];
			if(fk)
				app.ut.tyAhead({elem:tyas.eq(i), url:fk.url, filters:fk.filters, dKey:fk.dKey});
		};*/
		this.linkFks(tyas, this.parentView.fks);

		this.$el.find('.tya.tt-hint').removeAttr('required');

		this.form.foundation().on('valid.fndtn.abide', function (e) {
			e.preventDefault();
			that.save();
		}).on('submit', function (e) {
			e.preventDefault();
		});

		// var _uploads = this.form.find('.upload');
		// this.uploads = Object();
		// for (var i = 0; i < _uploads.length; i++) {
		// 	var elem = _uploads.eq(i);
		// 	app.ut.upload({elem:elem});
		// 	this.uploads[elem.data('field')] = elem;
		// }

		if(this.options.parentView.rConf) {
			this.rElems = this.$el.find('.up-foto');
			this.remotes = ViBase.prototype.linkRemote.call(this, this.rElems, this.options.parentView.rConf);
		}
	},
	/*-------------------------- Key --------------------------*/
	key_close: function(e) {
		// e.preventDefault();

		//var that = this;

		//this.key_count.close++;
		//var time = setTimeout(function() {
		//	that.key_count.close = 0;
		//}, 500);

		//console.log(this.key_count.close);
		//if(this.key_count.close >= 2) 
		//	this.close();
		//else
		//	this.$el.find('[tabindex="1"]').select();
		this.close();
	},
	key_save: function() {
		this.form.submit();
	},
	key_enter: function(e) {
		var form = $(e.srcElement).parents('form');

		var tabindex = $(e.srcElement).attr('tabindex');
		if(tabindex === undefined)
			tabindex = 0;
		else
			tabindex = tabindex.toInt();

		var elem = form.find('[tabindex="' + (tabindex + 1) + '"]');

		if(elem.length == 0)
			elem = form.find('[tabindex="1"]');
		//elem.focus();
		elem.select();
		//this.form.submit();
	},
	/*-------------------------- Base --------------------------*/
	linkFks: function(tyas, pfks, arrReturn) {
		var arr;
		if(arrReturn)
			arr = Object();
		else
			arr = this.tyas = Object();

		for (var i = 0; i < tyas.length; i++) {
			var fk = pfks[tyas.eq(i).data('field')];
			if(fk) {
				app.ut.tyAhead({elem:tyas.eq(i), url:fk.url, filters:fk.filters, sorts:fk.sorts, where:fk.where, dKey:fk.dKey, done:fk.done, onSelected:fk.onSelected, onClean:fk.onClean, custom:fk.custom, def:fk.def, tmp:fk.tmp});
				arr['tya' + tyas.eq(i).data('field')] = tyas.eq(i);
			}
		};

		tyas.find('.tt-hint').removeAttr('required');

		return arr;
	},
	render: function(data){
		var that = this;
		app.ut.bind(this);

		this.model = data.model;
		this.crud = data.crud || 1;
		this.clear();
		
		if(this.crud == 2) {
			this.setData(this.model.toJSON() || {});
			var locked = this.parentView.extras.locked || [];

			for(var i = 0; i < locked.length; i++) {
				var elem = this.$el.find('[data-field="' + locked[i] + '"]');
				elem.attr('disabled', 'disabled');
			}
		}

		for(var key in this.remotes) {
			var type = app.ut.str_options.remote.passive;
			var idKey = 0;

			if(this.crud == 2) {
				type = app.ut.str_options.remote.active;
				idKey = this.model.get(this.pk);
			}
			else
				this.remotes[key].clean();

			this.remotes[key].setConf({type:type, idKey:idKey});
		}
		
		this.$el.foundation('reveal', 'open');

		setTimeout(function() {
			that.$el.find('[tabindex]:not(:disabled):not([href])').eq(0).select();
		}, 500);
	},
	close: function() {
		this.$el.foundation('reveal', 'close');
		app.ut.bind(this.parentView);
	},
	clear: function() {
		this.form[0].reset();
		this.$el.find('[data-field]').removeAttr('disabled');
		this.$el.find('.tya-clear').click();

		for(var key in this.remotes)
			this.remotes[key].clean();

		if(this.mode.upload) {
			for (var key in this.uploads)
				this.uploads[key].data('fn').clean();
		}
	},
	clean: function() {
		var clean = this.parentView.extras.clean;
		if(clean.length == 0)
			return;

		for(var i=0; i<clean.length; i++) {
			var elem = this.$el.find('[data-field="' + clean[i] + '"]');

			if(elem.hasClass('tya'))
				elem.data('fn').clean();
			else if(elem.prop("nodeName") == 'SELECT')
				elem.find('option:first').prop('selected', true);
			else if(elem.prop("type") == 'checkbox')
				elem.prop('checked', false);
			else
				elem.val('');
		}

		//this.$el.find('[data-field="' + clean[0] + '"]').focus();
	},
	getData: function() {
		var data = ViBase.prototype.getData.call(this, this.form);
		if(this.mode.getPlantel)
			data.idPlantel = {to:'u'};
		return data;
	},
	setData: function(data) {
		ViBase.prototype.setData.call(this, data, this.form);
	},
	save: function() {
		debugger
		var that = this,
			json = that.getData();
		
		var type = 'POST';
		var url = this.url;
		if(this.crud == 2) {
			type = 'PUT';
			url += '/' + this.model.get(this.pk);
			_.defaults(json, this.model.attributes);
		}
		else
			_.defaults(json, this.modelBase.defaults);

		var upForm;
		if(this.mode.upload)
			upForm = this.form;

		json.type = 'grid';

		app.ut.request({url:url, data:json, done:done, type:type, form:upForm});
		
		function done(data) {
			debugger
			
			var clean = false;
			that.on_save = false;
			if(data.errmsg && data.errmsg.length > 0) {
				app.ut.message({text:data.errmsg});
				return false;
			}
			else if(that.mode && that.mode.SaveAndContinue && that.crud == 1)
				clean = true;
			else
				that.click_cancelar(that);

			if(data.data)
				data = data.data;

			for(var key in that.tyas) {
				var include = that.tyas[key].data('include'),
					value = that.tyas[key].data('fn').current();

				data[include] = value;
			}

			if(clean)
				that.clean();

			data.crud = that.crud;
			var model = that.parentView.addRow(data);

			for(var key in that.remotes) {
				var remote = that.remotes[key];
				if(remote.type == app.ut.str_options.remote.active)
					continue;

				remote.setConf({idKey:data[that.pk]});

				var dfd = remote.uploadImg();

				if(dfd !== undefined)
					dfd.done(function(url) {
						debugger
						that.model
						model.set(key, url);
					});
			}
		}
	},
	/*-------------------------- Eventos --------------------------*/
	click_aceptar: function() {
		this.form.submit();
	},
	click_cancelar: function() {
		this.close();
	},
	keyup_pop: function(e) {
		console.log(e)
		e.stopPropagation();
		if((e.keyCode ? e.keyCode : e.which) == 13 && !this.on_save) {
			this.on_save = true;
			this.form.submit();
		}
	},
});

var ViPopConfirmacion = Backbone.View.extend({
	el: '#popConfirmacion',
	events: {
		'click .btn-cancelar'   : 'click_cancelar',
	},
	initialize: function() {
		this.btnAceptar = this.$el.find('.btn-aceptar');
	},
	/*-------------------------- Base --------------------------*/
	render: function(fn){
		this.btnAceptar.off('click').on('click', fn);
		
		this.$el.foundation('reveal', 'open');
	},
	/*-------------------------- Eventos --------------------------*/
	click_cancelar: function() {
		this.$el.foundation('reveal', 'close');
	},
});
var popConfirm = new ViPopConfirmacion();

define(['/assets/base/base', '/assets/base/controles'], function (base, controles) {
	return {abc: ViABC, popAbc: ViPopSaveABC, base:ViBase, confirm: popConfirm};
});