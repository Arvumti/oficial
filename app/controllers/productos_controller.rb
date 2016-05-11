class ProductosController < ApplicationController
	def index 
		#@producto = Producto.includes(:categoria).where(activo: 1, 'categorias.activo' => 1).order('created_at DESC')
		@producto = Producto.includes(:categoria).where(activo: 1, 'categorias.activo' => 1)
		@categoria = Categoria.where(activo: 1)
		puts "=======Productos==========="
		puts @producto.to_json
		puts "==========FIN=============="
		render 'productos.html.erb'
	end
	def create
		SetResul({:data=> set_data(model_params, params[:action], nil, 'producto') })
	end
	def update
		SetResul({:data=> set_data(model_params, params[:action], find_model, 'producto') })
	end
	def destroy
		SetResul({:data=> set_data(delete_model, 'delete', find_model, 'producto') })
	end

	private
		def find_model
			Producto.find(params[:id])
		end
		def model_params
			params.require(:producto).permit(:idCategoria, :nombre, :precio, :oferta, :descripcion, :foto, :vigencia, :activo)
		end
		def delete_model
			params = ActionController::Parameters.new(activo: 0)
			params.permit(:activo)
		end
end