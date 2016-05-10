class FotosPostsController < ApplicationController
	def index 
		get_data('foto_post') 
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'foto_post') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'foto_post') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'update', find_model, 'foto_post') })
	end

	private
		def find_model
			FotoPost.find(params[:id])
		end
		def model_params
			params.require(:foto_post).permit(:idPost, :foto)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end