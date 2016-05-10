class GaleriasController < ApplicationController
	def index 
		get_data('galeria') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'galeria') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'galeria') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'galeria') })
	end

	private
		def find_model
			Galeria.find(params[:id])
		end
		def model_params
			params.require(:galeria).permit(:idCategoria, :titulo, :video, :foto, :tipo, :vigencia, :info, :idEspecial)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end