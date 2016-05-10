var bust = (new Date()).getTime();//'151118';//

// requirejs.onError = function (err) {
// 	debugger
// };

require.config({
	waitSeconds: 3000,
	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {		
		'handlebars'	: '/assets/deps/handlebars',

		'typeahead'		: '/assets/deps/typeahead',
		'text'			: '/assets/deps/text',

		'router'		: '/assets/base/router',
		'base'			: '/assets/base/base',
		'templates'		: '/assets/base/templates',
		'app'			: '/assets/app',
	},
	shim: {
		'lodash'		: { exports:'_' },
		
		// 'router'		: { deps:['backbone'] },
		// 'app'			: { deps:['backbone'] },
	}
});

require([
	'handlebars',
	'text',
	'templates',

	'typeahead',
	'base',
	
	'router',
	'app'
], function (
	handlebars,
	text,
	templates,

	typeahead,
	base,
	
	router,
	view_app
	) {
	
	//debugger

	var app = {
		views: {},
		loadAsync: base.loadAsync,
		ut: new base.utilerias(),
		load_content: $('#load_content'),
		templates: {},
		controles: {},
		models: {},
		collections: {},
		servicios: {},
		currView: {
			close: function() {},
			$el: $('div'),
		},
		socket: {},
	};

	window.app = app;
	
	base.bases();
	app.templates = new templates();

	// $(document).ajaxComplete(function(event, request, settings) {
	//   	if(request.status == 500) { 
	// 		app.ut.logging({tipo:'ajax:'+settings.type, url:settings.url});
	// 		alert('Sesion caducada, vuelva a iniciar sesion');
	// 		window.location.href = '/sesiones/logout';
	// 	}
	// });

	$(document).foundation({
		reveal: {
			close_on_background_click: false,
			multiple_opened: true,
		},
		abide : {
			live_validate : true,
    		validate_on_blur : true,
			patterns: {
				curp: /^[a-zA-Z]{4}[0-9]{6}[m|h|M|H][a-zA-Z]{2}[a-zA-Z]{3}[a-zA-Z0-9][0-9]$/,
				decimales: /^[0-9]+(\.[0-9][0-9]?)?$/,
				numeros: /^[0-9]+$/,
				horas: /^[0-9]{2}\:[0-9]{2}$/,
				string: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
				clave: /^[A-Z\d]+$/,
				email: /^[\w\-\.0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2,3})?$/,
				rfc: /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/,
			}
		},
	});
	$(document).foundation('reflow');
	app.views['main'] = new view_app();

	app.router = new router;
	Backbone.history.start({
		root: '/',
	});

	
	app.ut.hide();
	app.usuario = window.usuario;
	console.log('ok');
});