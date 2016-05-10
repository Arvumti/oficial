class EspecialesController < ApplicationController
	def index
		get_data('especial')
	end
	def show
		@post = Post.find(params[:id])
		@info = Configuracion.first
		render 'articulos_detalles.html.erb'
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'especial') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'especial') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'especial') })
	end

	private
		def find_model
			Especial.find(params[:id])
		end
		def model_params
			params.require(:especial).permit(:titulo, :foto, :vigencia, :descripcion, :nombre)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end
