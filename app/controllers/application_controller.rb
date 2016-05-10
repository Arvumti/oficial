class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	#protect_from_forgery with: :exception
	after_action :allow_iframe, only: [:login, :index, :main]
	
	def main
		puts 'main'
		puts '--- sesion ---'
		puts @usuario.class.name
		@usuario = session[:usuario].as_json

		if @usuario.class.name == 'String' || @usuario == nil
			redirect_to '/'
			return
		end

		# nivel_educativo = Hash.new

		# puts '--- usuario - periodo ---'
		# puts @usuario.to_json
		# @usuario['usuario_nivel'].each do |item|
		# 	nivel_educativo['nombre'] = item['nivel_educativo']['nombre']
		# 	nivel_educativo['idNivelEducativo'] = item['idNivelEducativo']
		# 	nivel_educativo['idUsuarioNivel'] = item['idUsuarioNivel']
		# 	nivel_educativo['periodo'] = Hash.new

		# 	item['nivel_educativo']['periodo'].each do |periodo|
		# 		puts periodo['nombre']

		# 		if periodo['actual'] == 1
		# 			nivel_educativo['periodo']['idPeriodo'] = periodo['idPeriodo']
		# 			nivel_educativo['periodo']['nombre'] = periodo['nombre']
		# 			nivel_educativo['periodo']['fechaIni'] = periodo['fechaIni']
		# 			nivel_educativo['periodo']['fechaFin'] = periodo['fechaFin']
		# 		end
		# 	end
		# end
		# @usuario['actual_nivel_educativo'] = nivel_educativo
		# session[:usuario]['idNivelEducativo'] = nivel_educativo['idNivelEducativo']
		# @usuario['idPeriodo'] = nivel_educativo['periodo']['idPeriodo']

		# menu_usuario = @usuario['menu_usuario']

		# menus = Hash.new
		# menu_usuario.each do |item|
		# 	menu = menus[item['menu_pagina']['menu_n1']['idMenuN1']]

		# 	if menu == nil
		# 		menu = Hash.new
		# 		menu['nombre'] = item['menu_pagina']['menu_n1']['nombre']
		# 		menu['pagina'] = item['menu_pagina']['pagina']
		# 		menu['menus'] = Array.new

		# 		menus[item['menu_pagina']['menu_n1']['idMenuN1']] = menu
		# 	end

		# 	menu['menus'].push({
		# 		'nombre' => item['menu_pagina']['menu_n2']['nombre'],
		# 		'pagina' => item['menu_pagina']['pagina'],
		# 	})
		# end

		# @usuario['menus'] = menus
	end
	def login
	end
	def index
		#@baner = Baner.where("vigencia >= :vigencia AND activo = 1",{vigencia: Time.new})
		#@especial = Especial.where("vigencia >= :vigencia AND activo = 1",{vigencia: Time.new})	
		#@galeria = Galeria.where("vigencia >= :vigencia AND activo = 1",{vigencia: Time.new})
		#@post = Post.includes(:categoria).where(activo: 1, 'categorias.activo' => 1).order('orden DESC')
		#@categoria = Categoria.where(activo: 1)
		#@info = Configuracion.first	
	end	
	def get_data(model)
		where = params[:where] || Array.new
		includes = params[:includes] || Array.new
		p_where = ""

		puts '-------------------- where --------------------'
		puts where
		
		if where.size > 0 then
			p_where = ' WHERE '
			n = 1
			for key, value in where
				puts key
				puts value.class.name == 'String'

				con = ' AND '
				if n == 1
					con = ''
				end

				if value.class.name == 'String'
					p_where += con + key + " = '" + value + "' "
				elsif value.class.name == 'Array'
					p_where += con + key + " IN ('" + value.join("', '") + "') "
				else
					op = value[:op] || '='
					if n > 1
						con = value[:con] || con
					end

					v_value = value[:value]
					if value[:value].class.name == 'Array'
						op = ' IN '
						v_value = "('" + v_value.join("', '") + "')"
					else
						v_value = " '" + v_value + "' "
					end

					p_where +=  con + " " + key + " " + op + v_value
				end
				n += 1
			end
		end
		puts p_where

		p_query = "SELECT * FROM " + model.pluralize + p_where
		puts '-------------------------- p_query --------------------------'
		puts p_query
		@resul = model.singularize.classify.constantize.find_by_sql p_query

		puts includes
		if includes.length > 0
			includes_x = { :include => Array.new }

			puts '--- includes ---'
			for index, item in includes
				puts item
				puts item[:include]
				puts item[:include].class.name

				if item[:include]
					puts 1
					table = {}
					table[item[:table]] = { :include => Array.new }

					if item[:only]
						puts 1.2
						table[item[:table]][:only] = Array.new

						for only in item[:only]
							table[item[:table]][:only].push(only)
						end
					end

					puts '--- includes ---'
					for index_in, item_in in item[:include]
						puts index_in
						puts item_in

						if item_in[:only]
							puts 1.3
							table_in = {}
							table_in[item_in[:table]] = { :only => Array.new }

							for only in item_in[:only]
								table_in[item_in[:table]][:only].push(only)
							end

							table[item[:table]][:include].push(table_in)
						else
							puts 1.4
							table[item[:table]][:include].push(item_in[:table])
						end
					end
					puts table
					puts '--- end ---'
					includes_x[:include].push(table)
				elsif item[:only]
					puts 2
					table = {}
					table[item[:table]] = { :only => Array.new }

					for only in item[:only]
						table[item[:table]][:only].push(only)
					end

					includes_x[:include].push(table)
				else
					includes_x[:include].push(item[:table])
				end

				# if item.class.name == 'String'
				# 	includes_x.push({:include => item})
				# else
				# 	puts '--- key value---'
				# 	puts item

				# 	# for key, value in item
				# 	# 	puts key
				# 	# 	for item_in in value
				# 	# 		puts item_in
				# 	# 	end
				# 	# end
				# end
			end
			puts '--- begin includes_x ---'
			puts includes_x
			puts '--- end includes_x ---'
			@resul = @resul.as_json(includes_x)
		end

		#@model = model.pluralize.classify.constantize.all
		render :json => @resul.as_json
	end
	def set_data(params, action, data, model)
        puts '--'
		case action
			when "create" then
                puts '--'
				puts params
                puts '--'
				@model = model.singularize.classify.constantize.new(params)
                puts '--'
				if @model.save
					return @model
                    puts '--'
				else
                    puts '--'
					return {
						'errmsg' => @model.errors.full_messages.to_sentence(:last_word_connector => ', ', :two_words_connector => ', '), 
						'errnum' => 9500, 
						'data' => nil, 
						'params' => params
					}
				end
			when "update" then
				@model = data
				if @model.update(params)
					return @model
				else
					return {
						'errmsg' => @model.errors.full_messages.to_sentence(:last_word_connector => ', ', :two_words_connector => ', '), 
						'errnum' => 9500, 
						'data' => nil, 
						'params' => params
					}
				end
			when "delete" then
				@model = data
				if @model.destroy
					return @model
				else
					return {
						'errmsg' => @model.errors.full_messages.to_sentence(:last_word_connector => ', ', :two_words_connector => ', '), 
						'errnum' => 9500, 
						'data' => nil, 
						'params' => nil
					}
				end
		end
	end

	# Funciones #
	def save_foto
		data = JSON.parse(params[:data])
		idKey = data['idKey']
		pk = data['pk']
		table = data['table']
		field = data['field']
		oldUrl = data['oldUrl']

		dir = "/assets/db_imgs/#{table}/#{idKey}"
		full_dir = "app/assets/images/db_imgs/#{table}/#{idKey}"

		if oldUrl.size > 0
			FileUtils.rm("app/assets/images/db_imgs/#{oldUrl}")
		end

		FileUtils.mkdir_p full_dir
		uploaded_io = params[field]
		nombre_time = DateTime.now.strftime('%Q')
		ext = uploaded_io.original_filename.split('.')[uploaded_io.original_filename.split('.').size-1]

		nombre_foto = "#{dir}/#{nombre_time}.#{ext}"

		File.open(Rails.root.join('app', 'assets', 'images', 'db_imgs', table, "#{idKey}", "#{nombre_time}.#{ext}"), 'wb') do |file|
			file.write(uploaded_io.read)
		end
		puts ' ------- nombre -------- '
		ActiveRecord::Base.transaction do
			where = Hash.new
			where[pk] = idKey

			rows = table.singularize.classify.constantize.where(where)
			if rows.size > 0
				row = rows[0]

				update = Hash.new
				update[field] = nombre_foto

				if !row.update(update)
					render :json => {'errmsg' => @control.errors.full_messages.to_sentence(:last_word_connector => ', ', :two_words_connector => ', '), 'errnum' => 9500, 'data' => nil, 'params' => control_params}
					raise ActiveRecord::Rollback
				end
			end
		end
		render :json => {'errmsg' => '', 'errnum' => 0, 'data' => {'res' => 'ok', 'url' => nombre_foto}}
	end

	def SetResul(json)
		msg = json[:msg]
		num = json[:num]
		data = json[:data]
		if !json[:msg] then
			msg = ""
		end
		if !json[:num] then
			num = 0
		end
		if !json[:data] then
			data = {}
		end
		render :json => {
							'errmsg' => msg, 
							'errnum' => num, 
							'data' => data.as_json
						}
		#@model.errors.full_messages.to_sentence(:last_word_connector => ', ', :two_words_connector => ', ')
	end

	private
		def allow_iframe
			response.headers.except! 'X-Frame-Options'
		end
end
