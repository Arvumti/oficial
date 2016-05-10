class AnunciosController < ApplicationController
	def index 
		get_data('anuncio') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'anuncio') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'anuncio') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'delete', find_model, 'anuncio') })
	end

	private
		def find_model
			Anuncio.find(params[:id])
		end
		def model_params
			params.require(:anuncio).permit(:titulo, :texto, :foto, :vigencia, :link)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end