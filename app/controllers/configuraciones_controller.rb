class ConfiguracionesController < ApplicationController
	def index 
		get_data('configuracion') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'configuracion') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'configuracion') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'configuracion') })
	end

	private
		def find_model
			Configuracion.find(params[:id])
		end
		def model_params
			params.require(:configuracion).permit(:facebook, :twitter, :instagram, :texto, :foto, :direccion, :telefono, :correo)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end