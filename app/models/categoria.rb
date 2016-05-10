class Categoria < ActiveRecord::Base
	self.primary_key = :idCategoria
	has_one :post, :foreign_key => 'idCategoria'
end