class SeccionesDetallesController < ApplicationController
	def index 		
		@secciones = Seccion.all
		@info = Configuracion.first
		render 'secciones_detalles.html.erb'		
	end	
	def show
		@info = Configuracion.first
		@secciones = EspecialDetalle.includes(:especial).where(activo: 1, idEspecialDetalle: params[:id],'especiales.activo' => 1).first		
		puts @secciones.to_json
		render 'secciones_detalles.html.erb'
	end
end