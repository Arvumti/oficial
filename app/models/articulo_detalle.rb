class ArticuloDetalle < ActiveRecord::Base
	self.primary_key = :idPost
	belongs_to :especial, :foreign_key => 'idEspecial'
end
