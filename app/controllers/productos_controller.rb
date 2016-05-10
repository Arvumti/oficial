class ProductosController < ApplicationController
	def index 
		#@producto = Producto.includes(:categoria).where(activo: 1, 'categorias.activo' => 1).order('created_at DESC')
		@producto = Producto.includes(:categoria).where(activo: 1, 'categorias.activo' => 1)
		puts "=======Productos==========="
		puts @producto.to_json
		puts "==========FIN=============="
		render 'productos.html.erb'
	end	
end