class AutoresController < ApplicationController
	def index 
		get_data('autor') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'autor') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'autor') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'autor') })
	end

	private
		def find_model
			Autor.find(params[:id])
		end
		def model_params
			params.require(:autor).permit(:nombre, :informacion, :foto, :twitter, :facebook, :instagram, :activo)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end
