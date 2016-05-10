class PostAnuncio < ActiveRecord::Base
	self.primary_key = :idPostAnuncio

	belongs_to :post, :foreign_key => 'idPost'
	belongs_to :anuncio, :foreign_key => 'idAnuncio'	

	# -------------------- validacion ------------------- #
	validates :idPost, uniqueness: { scope: :idAnuncio}
end