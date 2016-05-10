class FotoPost < ActiveRecord::Base
	self.primary_key = :idFotoPost

	belongs_to :foto_post, -> { where activo: 1 }, :foreign_key => 'idPost'
end