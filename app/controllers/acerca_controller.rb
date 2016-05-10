class AcercaController < ApplicationController
	def index 
		@info = Configuracion.first		
		@comentario = 	Comentario.where(activo: 1)
		render 'acerca.html.erb'		
	end
end