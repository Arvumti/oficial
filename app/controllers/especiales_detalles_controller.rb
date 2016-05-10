class EspecialesDetallesController < ApplicationController
	def index 
		get_data('especial_detalle') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'especial_detalle') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'especial_detalle') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'especial_detalle') })
	end

	private
		def find_model
			EspecialDetalle.find(params[:id])
		end
		def model_params
			params.require(:especial_detalle).permit(:latitud, :longitud, :texto, :nombre, :foto, :activo, :idEspecial, :vigencia)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end
