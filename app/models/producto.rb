class Producto < ActiveRecord::Base
	self.primary_key = :idProducto
	belongs_to :categoria, :foreign_key => 'idCategoria'
end