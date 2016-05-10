class SeccionesController < ApplicationController
	def index 		
		@secciones = Seccion.all
		@info = Configuracion.first
		render 'secciones.html.erb'		
	end	
	def show
		puts params
		@secciones = EspecialDetalle.includes(:especial).where(activo: 1, idEspecial: params[:id],'especiales.activo' => 1)		
		render 'secciones.html.erb'
	end
end