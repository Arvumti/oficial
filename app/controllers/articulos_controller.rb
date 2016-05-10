class ArticulosController < ApplicationController
	def index 
		@post = Post.includes(:especial).where(activo: 1, 'especiales.activo' => 1).order('orden DESC')
		@info = Configuracion.first
		render 'articulos.html.erb'		
	end
	def show		
		@post = Post.includes(:especial).where(activo: 1, idEspecial: params[:id],'especiales.activo' => 1)	
		@info = Configuracion.first
		render 'articulos.html.erb'
	end
end