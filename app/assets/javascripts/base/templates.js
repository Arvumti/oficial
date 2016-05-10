var baseURL = 'http://localhost:1337/images/';
//var baseURL = 'http://cecyted.edu.mx:1337/images/';

function templates(){
	Handlebars.registerHelper('GetFechaActual', function(id, tipo) {
		var resultado = new Date();
		
		return new Handlebars.SafeString(resultado);
	});

	Handlebars.registerHelper('GetUrlServicio', function(id, tipo) {
		var resultado = '';
		switch (id.toString()) {
			case '2':
				resultado = tipo == 1 ? 'rpt_muestreo_concreto' : 'frm_muestreo_concreto';
				break;
			case '3':
				resultado = tipo == 1 ? 'rpt_muestra_humedad' : 'frm_muestreo_humedad';
				break;
			case '4':
				resultado = tipo == 1 ? 'rpt_marshall' : 'frm_marshall';
				break;
			case '5':
				resultado = tipo == 1 ? 'rpt_asfalto' : 'frm_asfalto';
				break;
			default:
				resultado = tipo == 1 ? 'rpt_terracerias' : 'frm_terracerias';
				break;
		}
		return new Handlebars.SafeString(resultado);
	});

	Handlebars.registerHelper('GetTipoControl', function(tipo) {
		var resultado = '';
		var cond = tipo ? tipo.toString() : '';
		switch (cond) {
			case '1':
				resultado = 'Vivienda';
				break;
			default:
				resultado = 'General';
				break;
		}
		return new Handlebars.SafeString(resultado);
	});

	Handlebars.registerHelper('GetEstatusOS', function(tipo) {
		var resultado = '';
		var cond = tipo ? tipo.toString() : '';
		switch (cond) {
			case '1':
				resultado = 'Abierta';
				break;
			case '2':
				resultado = 'Cerrada';
				break;
			default:
				resultado = 'Cancelada';
				break;
		}
		return new Handlebars.SafeString(resultado);
	});

	Handlebars.registerHelper('ifCond', function(val1, val2, options) {
		if(val1 === val2) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	Handlebars.registerHelper('ifCondAlt', function(val1, val2, condicion, options) {
		var res;
		switch(condicion) {
			case '!=':
				if(val1 != val2)
					res = options.fn(this);
				else
					res = options.inverse(this);
				break;
			case '>=':
				if(val1 >= val2)
					res = options.fn(this);
				else
					res = options.inverse(this);
				break;
			case '<=':
				if(val1 <= val2)
					res = options.fn(this);
				else
					res = options.inverse(this);
				break;
			case '>':
				if(val1 > val2)
					res = options.fn(this);
				else
					res = options.inverse(this);
				break;
			case '<':
				if(val1 < val2)
					res = options.fn(this);
				else
					res = options.inverse(this);
				break;
			default:
				if(val1 === val2)
					res = options.fn(this);
				else
					res = options.inverse(this);
				break;
		}

		return res;
	});

	Handlebars.registerHelper('unlessCond', function(val1, val2, options) {
		if(val1 !== val2) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	Handlebars.registerHelper('notCol', function(key, options) {
		if(key.startsWith('id'))
			return options.inverse(this);

		var cols = ['created_at', 'updated_at', 'rownum', 'dKey', 'activo', 'contrasenia'];
		if(_.contains(cols, key))
			return options.inverse(this);
		return options.fn(this);
	});
	
	Handlebars.registerHelper('toJSON', function(data) {
		var json = JSON.stringify(data);
		jParse = json.replace(/"/g, '|');

		return new Handlebars.SafeString(jParse);
	});

	var alerta = Handlebars.compile('<div class="alert-box {{tipo}} special altMenssage pop-alert" data-alert="data-alert"><span class="spnTexto">{{texto}}<a class="close" href="#">×</a></span></div>'),
		cbo = Handlebars.compile('{{#data}} <option value="{{_id}}">{{nombre}}</option> {{/data}}'),
		tyaBase = Handlebars.compile('NT-{{sku}} - {{nombre}}'),
		tyaTmp = Handlebars.compile('{{dKey}}'),
		foto = Handlebars.compile('<a class="th" href="#"><span class="img-wrap"><img class="up-img-foto upl-button" src="{{foto}}" /><input type="file" name="{{field}}" class="is-hidden" /><!--button type="button" class="btn primary upl-button" data-field="foto">Seleccionar foto</button--></span></a>')
		;
	
	return {
		alerta: alerta,
		tyaBase: tyaBase,
		tyaTmp: tyaTmp,
		cbo: cbo,
		foto: foto,
	}
}

define([], function () {
	return templates;

});