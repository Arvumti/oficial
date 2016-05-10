class ComentariosController < ApplicationController
	def index 
		get_data('comentario') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'comentario') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'comentario') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'comentario') })
	end

	private
		def find_model
			Comentario.find(params[:id])
		end
		def model_params
			params.require(:comentario).permit(:titulo, :texto, :fecha)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end