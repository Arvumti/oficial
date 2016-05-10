class Articulo < ActiveRecord::Base
	self.primary_key = :idArticulo
	belongs_to :categoria, :foreign_key => 'idCategoria'
	belongs_to :autor, :foreign_key => 'idAutor'
end