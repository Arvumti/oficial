class ArticulosDetallesController < ApplicationController
	def index 
		@info = Configuracion.first	
		@post = Post.includes(:especial).where(activo: 1, idPost: params[:id],'especiales.activo' => 1).first
		if @post.blank? 
			@error = 1		
		end
		render 'articulos_detalles.html.erb'		
	end	
	def show
		@info = Configuracion.first
		@post = Post.includes(:especial).where(activo: 1, idPost: params[:id],'especiales.activo' => 1).first
		if @post.blank? 
			@error = 1		
		end
		puts @post.to_json
		render 'articulos_detalles.html.erb'
	end
end