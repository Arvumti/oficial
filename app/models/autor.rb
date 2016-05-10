class Autor < ActiveRecord::Base
	self.primary_key = :idAutor
	has_one :post, :foreign_key => 'idAutor'
end
