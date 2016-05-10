class BanersController < ApplicationController
	def index 
		get_data('baner') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'baner') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'baner') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'baner') })
	end

	private
		def find_model
			Baner.find(params[:id])
		end
		def model_params
			params.require(:baner).permit(:titulo, :subtitulo, :texto, :foto, :vigencia)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end