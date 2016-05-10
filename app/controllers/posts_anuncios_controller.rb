class PostsAnunciosController < ApplicationController
	def index 
		get_data('post_anuncio') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'post_anuncio') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'post_anuncio') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'delete', find_model, 'post_anuncio') })
	end

	private
		def find_model
			PostAnuncio.find(params[:id])
		end
		def model_params
			params.require(:post_anuncio).permit(:idPost, :idAnuncio, :principal)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end