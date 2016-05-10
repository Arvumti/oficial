class CategoriasController < ApplicationController
	def index 
		get_data('categoria') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'categoria') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'categoria') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'categoria') })
	end

	private
		def find_model
			Categoria.find(params[:id])
		end
		def model_params
			params.require(:categoria).permit(:nombre)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end