class PostsFotosController < ApplicationController
	def index 
		get_data('post_foto') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'post_foto') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'post_foto') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'delete', find_model, 'post_foto') })
	end

	private
		def find_model
			PostFoto.find(params[:id])
		end
		def model_params
			params.require(:post_foto).permit(:idPost, :idGaleria)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end
