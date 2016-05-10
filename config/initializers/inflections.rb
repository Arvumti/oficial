
# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format. Inflections
# are locale specific, and you may define rules for as many different
# locales as you wish. All of these examples are active by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.plural /^(ox)$/i, '\1en'
#   inflect.singular /^(ox)en/i, '\1'
#   inflect.irregular 'person', 'people'
#   inflect.uncountable %w( fish sheep )
# end

# These inflection rules are supported but not enabled by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.acronym 'RESTful'
# end

ActiveSupport::Inflector.inflections do |inflect|
	inflect.irregular 'especial', 'especiales'
	inflect.irregular 'categoria', 'categorias'
	inflect.irregular 'galeria', 'galerias'
	inflect.irregular 'post', 'posts'
	inflect.irregular 'configuracion', 'configuraciones'
	inflect.irregular 'anuncio', 'anuncios'
	inflect.irregular 'comentario', 'comentarios'
	inflect.irregular 'baner', 'baners'
	inflect.irregular 'especial_detalle', 'especiales_detalles'
	inflect.irregular 'articulo_detalle', 'articulos_detalles'
	inflect.irregular 'seccion_detalle', 'secciones_detalles'
	
	inflect.irregular 'foto_post', 'fotos_posts'
	inflect.irregular 'post_foto', 'posts_fotos'
	inflect.irregular 'autor', 'autores'
	inflect.irregular 'post_anuncio', 'posts_anuncios'
	inflect.irregular 'seccion', 'Secciones'
end

