class PostFoto < ActiveRecord::Base
	self.primary_key = :idPostFoto

	belongs_to :post, -> { where activo: 1 }, :foreign_key => 'idPost'
	belongs_to :galeria, -> { where activo: 1 }, :foreign_key => 'idGaleria'


	# -------------------- validacion ------------------- #
	validates :idPost, uniqueness: { scope: :idGaleria}
end
