class ProductosDetallesController < ApplicationController
	def index 		
	end	
	def show
		@producto = Producto.includes(:categoria).where(activo: 1, idProducto: params[:id],'categorias.activo' => 1)
		@categoria = Categoria.where(activo: 1)
		puts "=======Productos==========="
		puts @producto.to_json
		puts "==========FIN=============="
		render 'productos_detalles.html.erb'
	end
end