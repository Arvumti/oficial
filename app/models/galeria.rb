class Galeria < ActiveRecord::Base
	self.primary_key = :idGaleria

	belongs_to :categoria, -> { where activo: 1 }, :foreign_key => 'idCategoria'
	belongs_to :especial, -> { where activo: 1 }, :foreign_key => 'idEspecial'
	has_many :post_foto, -> { where activo: 1 }, :foreign_key => 'idGaleria'
end