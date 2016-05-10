class PostsController < ApplicationController
	def index 
		@post = Post.all.order('created_at DESC')
		render 'articulos.html.erb'		
	end
	def show
		@post = find_model
		render 'articulos_detalles.html.erb'	
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'post') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'post') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'delete', find_model, 'post') })
	end

	private
		def find_model
			Post.find(params[:id])
		end
		def model_params
			params.require(:post).permit(:idCategoria, :titulo, :fecha, :texto, :link, :foto, :orden, :idAutor, :idEspecial, :ubicacion)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end