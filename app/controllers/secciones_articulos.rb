class SeccionesArticulosController < ApplicationController
	def index 
		get_data('secciones_articulos') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'secciones_articulos') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'secciones_articulos') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'secciones_articulos') })
	end

	private
		def find_model
			Secciones_articulos.find(params[:id])
		end
		def model_params
			params.require(:secciones_articulos).permit(:latitud, :longitud, :texto, :nombre, :foto, :activo)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end
