class ControlesController < ApplicationController
	def grid
		model = params[:model]
		includes = params[:includes] || Array.new
		data = params[:data]
		aggregation = params[:aggregation]
		specials = aggregation[:specials]

		skip = (data[:page].to_i - 1) * data[:pageSize].to_i
		take = skip + data[:pageSize].to_i

		if skip != 0
			skip += 1
		end

		page = data[:page]
		pageSize = data[:pageSize]
		
		joins = ''
		join_order_before = ''
		join_order_after = ''
		join_order_table = ''
		join_where = ''
		
		ord = ''
		tipo_order = ''
		join_in_order = false
		puts "---- order by ----"
		puts aggregation[:order]

		if aggregation[:order] != nil && aggregation[:order] != "[]" && aggregation[:order][:field] != nil then
			orden = aggregation[:order][:orden].to_i
			if orden == 1 || orden == -1 then
				ord +=  aggregation[:order][:field]
				if orden == -1 then
					tipo_order = " desc"
					ord += tipo_order
				end
			end

			if aggregation[:order][:table] != nil
				join_in_order = true
				if orden == 0
					join_in_order = false
				end

				jTable = aggregation[:order][:table]
				jWhere = aggregation[:order][:where]

				join_query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + jTable + "' LIMIT 1"
				join_col = model.singularize.classify.constantize.find_by_sql join_query
				columna = join_col[0]['COLUMN_NAME']

				join_order_before = " INNER JOIN " + jTable + " ON t." + columna + " = " + jTable + "." + columna + " AND " + jTable + ".activo = 1 "
				join_order_after = " ORDER BY " + jWhere + tipo_order
				join_order_table = jTable
				puts '------------------------ BEGIN JOIN ORDER ------------------------'
				puts join_order_before
				puts join_order_after
				puts join_order_table
				puts '------------------------ END JOIN ORDER ------------------------'
				ord = ''
			end
		end

		filtro = aggregation[:filter]
		puts "----"
		puts aggregation[:filter]
		filNext = false
		where = ''

		if filtro != nil then
			for index, j in filtro
				puts '------------------ BEGIN JOINS ------------------'
				puts j
				puts '------------------ END JOINS ------------------'
				#INNER JOIN perfiles pf ON t.idPerfil = pf.idPerfil WHERE pf.nombre = 'Primaria'

				if j[:query] != '' then
					if j[:table] != nil
						join_query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + j[:table] + "' LIMIT 1"
						join_col = model.singularize.classify.constantize.find_by_sql join_query
						columna = join_col[0]['COLUMN_NAME']
						tmp_join = ''
						if j[:table] == join_order_table
							joins += join_order_before + " AND " + j[:table] + "." + j[:where] + " LIKE '%" + j[:query] + "%' " + join_order_after
						else
							joins += " INNER JOIN " + j[:table] + " ON t." + columna + " = " + j[:table] + "." + columna + " AND " + j[:table] + "." + j[:where] + " LIKE '%" + j[:query] + "%' AND " + j[:table] + ".activo = 1 "
						end
					else
						if filNext then
							where += " AND "
						end
						where +=  j[:field] + " LIKE '%" + j[:query] + "%'"
						filNext = true
					end
				end
			end
		end

		puts "---- joins ----"
		puts joins
		puts where

		puts "---- specials ----"
		puts specials
		if specials != nil
			for index, item in specials
				if filNext then
					where += " AND "
				end

				value_sp = ''
				if item[:to] == 'u'
					value_sp = GetFromUser(item[:field].to_s)
				else
					value_sp = item[:value].to_s
				end

				where += item[:field] + ' = ' + value_sp
				puts item
				puts item[:field]
				puts item[:value]
				puts 'end iteracion'
				filNext = true
			end
		end
		puts where

		#List<JObject> datos = sps.GetGrid(modelo, where, ord, skip, take).ToList();
		columna = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + model + "' LIMIT 1"
		@v_where = ''
		@v_order = ''
		if where != nil && where.size > 0 then
			@v_where = " WHERE " + where
		end
		if ord.size > 0 then
			@v_order = " ORDER BY " + ord
		elsif join_in_order == false			
			@v_order = " ORDER BY updated_at DESC"
		end

		#p_query = "SELECT * FROM " + model + " WHERE activo = 1 "
		p_query = "SELECT COUNT(*) conteo FROM (SELECT t.* FROM " + model + " t " + joins + ") t " + @v_where
		puts p_query
		resul = model.pluralize.classify.constantize.find_by_sql p_query
		puts '--- count ---'
		puts resul[0]['conteo']
		total = resul[0]['conteo'].to_i
		
		#query = "SELECT *  FROM ( SELECT t.*, @rownum:=@rownum+1 rownum FROM "+ model + " t, (SELECT @rownum:=0) n " + @v_where + @v_order + " order by (" + columna + ") asc) n WHERE n.rownum BETWEEN " + skip.to_s + " AND " + take.to_s;
		query = "SELECT *  FROM ( SELECT t.*, @rownum:=@rownum+1 rownum FROM (SELECT t.* FROM " + model + " t " + joins + ") t, (SELECT @rownum:=0) n " + @v_where + @v_order + ") n WHERE n.rownum BETWEEN " + skip.to_s + " AND " + take.to_s
		#query = "SELECT *  FROM ( SELECT t.*, @rownum:=@rownum+1 rownum FROM (SELECT t.* FROM " + model + " t INNER JOIN perfiles pf ON t.idPerfil = pf.idPerfil WHERE pf.nombre = 'Primaria') t, (SELECT @rownum:=0) n) n WHERE n.rownum BETWEEN " + skip.to_s + " AND " + take.to_s;
		puts '--- query ---'
		puts ord
		puts query
		@grid = model.singularize.classify.constantize.find_by_sql query
		#Session[:aggregation] = aggregation
		
		resul = {
			data: @grid,
			total: total,
			aggregation: aggregation
		}

		if includes.length > 0
			resul[:data] = @grid.as_json({ :include => includes })
		end

		puts "----"
		#puts resul[:data]
		puts resul
		puts resul.as_json
		puts "----"
		render :json =>  resul
		
		#puts resul.as_json
	end
	def tya
		model = params[:model]
		query = params[:query]
		filters = params[:filters]
		where = params[:where]
		sorts = params[:sorts]
		custom = params[:custom] || ''
		includes = params[:includes] || Array.new
		displayKey = params[:displayKey]

		skip = 0
		take = 10

		if params[:page] && params[:pageSize]
			skip = (params[:page].to_i - 1) * params[:pageSize].to_i
			take = skip + params[:pageSize].to_i

			if skip != 0
				skip += 1
			end
		end
		puts '----------- begin skip take -----------'
		puts skip
		puts take
		puts '----------- end skip take -----------'

		joins = ''
		join_table = ''
		join_where = ''
		
		puts '----------- begin where -----------'
		p_where = ""
		puts 1
		if filters.size > 0 then
			n = 1
			for index, item in filters
				puts '----'
				puts item
				puts '----'
				if item[:table] != nil
					join_query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + item[:table] + "' LIMIT 1"
					join_col = model.singularize.classify.constantize.find_by_sql join_query
					columna = join_col[0]['COLUMN_NAME']
					tmp_join = ''
					
					joins += " INNER JOIN " + item[:table] + " ON t." + columna + " = " + item[:table] + "." + columna + " AND " + item[:table] + "." + item[:filter] + " LIKE '%" + query + "%' AND " + item[:table] + ".activo = 1 "
				else
					if n == 1 then
						p_where += " WHERE ("+ item[:filter] + " LIKE '%" + query + "%' "
					else
						p_where += "OR "+ item[:filter] + " LIKE '%" + query + "%'"
					end
					puts 2
					n+=1
				end
			end
			if p_where.length > 0
				p_where += ") "
			end
		end
		puts p_where
		puts 3
		# JS {nombre:'asdf'}, {idUsuario: {to:'u'} }
		# ROR {nombre => 'admin'}, {idUsuario => 1 }
		if where.size > 0 then
			n = 1
			for item in where
				valor = item[1][:value]
				puts '--- val ---'
				puts valor["to"]
				if valor["to"]
					valor = session[:usuario][item[1][:field]]
				end

				whereand = 'AND'
				if p_where.length == 0
					whereand = ' WHERE '
				end

				if n == 1 then
					p_where += whereand + " ( "+ item[1][:field] + " = '" + valor.to_s + "' "
				else
					p_where += whereand + " "+ item[1][:field] + " = '" + valor + "' "
				end
				n+=1
			end
			p_where += ")"

		end
		puts p_where
		fin = p_where.length - 2
		nw = p_where[0, fin]
		puts '----------- joins -----------'
		puts joins
		puts '----------- end where -----------'

		p_query = "SELECT COUNT(*) conteo FROM (SELECT t.* FROM " + model + " t " + joins + ") t " + p_where
		resul = model.pluralize.classify.constantize.find_by_sql p_query
		total = resul[0]['conteo'].to_i
		
		#p_query = "SELECT * FROM ( SELECT t.*, @rownum:=@rownum+1 rownum FROM " + model + " t, (SELECT @rownum:=0) n " + p_where + ") n WHERE n.rownum <= 10";
		p_query = "SELECT * FROM ( SELECT t.*, @rownum:=@rownum+1 rownum FROM (SELECT t.* FROM " + model + " t " + joins + ") t, (SELECT @rownum:=0) n " + p_where + ") n WHERE n.rownum BETWEEN " + skip.to_s + " AND " + take.to_s
		#p_query= "SELECT * FROM " + model + p_where
		puts '----------- query -----------'
		puts p_query
		#resul = ActiveRecord::Base.connection.execute(p_query)
		resul = model.singularize.classify.constantize.find_by_sql p_query
		puts resul.as_json

		puts '----------- includes -----------'
		puts includes
		if includes.length > 0
			resul = resul.as_json({ :include => includes })
		end
		#@data = model.classify.constantize.where(nw, where)
		#render :json => @articles.as_json({:include => { :comments => { :only => :body, :include => :otros } } })
		
		#"title = :title"
		#"edad > :edad"
		#@articles = Post.where(nw, where)
		render :json => {
			:errmsg => '', 
			:data => resul, 
			:total => total,
			:max => take
		}
		#render :json => params.permit(:algo, :otro).as_json()
	end
end