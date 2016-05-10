# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
TipoMaterial.create([
	{nombre:'BASE HIDRAULICA'}, 
	{nombre:'A IDENTIFICAR'}, 
	{nombre:'RELLENO'}, 
	{nombre:'TERRAPLEN 5'}, 
	{nombre:'TERRAPLEN 7'}, 
])

Elemento.create([
	{nombre:'COMPACTACION'}, 
	{nombre:'CALIDAD'}, 
	{nombre:'ESTRATO 1'},
	{nombre:'ESTRATO 2'},
	{nombre:'ESTRATO 3'},
])

Cliente.create([
	{nombre:'cliente 1', direccion:'dir 1'}, 
	{nombre:'cliente 2', direccion:'dir 2'}
])

Categoria.create([
	{idCategoria:1, nombre:'Terracerias', ensaye:1}, 
	{idCategoria:2, nombre:'Concretos', ensaye:1}, 
	{idCategoria:3, nombre:'Asfaltos', ensaye:1}, 
	{idCategoria:4, nombre:'Otros', ensaye:1}
])

Servicio.create([
	{idServicio:1, nombre:'Calidad', idCategoria:1}, 
	{idServicio:2, nombre:'Hidraulico', idCategoria:2},
	{idServicio:3, nombre:'Humedad optima', idCategoria:2},
	{idServicio:4, nombre:'Marshall', idCategoria:2},
	{idServicio:5, nombre:'ASfaltos', idCategoria:2}
	# {idServicio:3, nombre:'Tabiques', idCategoria:2},
	# {idServicio:4, nombre:'Castillos', idCategoria:2},
	# {idServicio:5, nombre:'Cerramientos', idCategoria:3},
	# {idServicio:6, nombre:'Azoteos', idCategoria:3},
	# {idServicio:7, nombre:'Guarnicion', idCategoria:4},
	# {idServicio:8, nombre:'Banqueta', idCategoria:4},
	
	# {idServicio:9, nombre:'Terraplen', idCategoria:1},
	# {idServicio:10, nombre:'Subtacente', idCategoria:2},
	# {idServicio:11, nombre:'Subrasante', idCategoria:3},
	# {idServicio:12, nombre:'Base', idCategoria:4},
	
	# {idServicio:13, nombre:'Morteros', idCategoria:2},
	# {idServicio:14, nombre:'Cimentacion', idCategoria:1},
])

Obra.create([
	{nombre:'obra 1'}, 
	{nombre:'obra 2'}
])

Usuario.create([
	{nombre:'Administrador', usuario:'admin', contrasenia:'admin'}
])