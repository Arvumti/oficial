class Anuncio < ActiveRecord::Base
	self.primary_key = :idAnuncio
	has_many :post_anuncio, :foreign_key => 'idAnuncio'
end
