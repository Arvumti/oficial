class Post < ActiveRecord::Base
	self.primary_key = :idPost

	belongs_to :categoria, -> { where activo: 1 }, :foreign_key => 'idCategoria'
	belongs_to :especial, -> { where activo: 1 }, :foreign_key => 'idEspecial'
	belongs_to :autor, :foreign_key => 'idAutor'
	has_many :post_foto, :foreign_key => 'idPost'
	has_many :post_anuncio, :foreign_key => 'idPost'

	has_many :anuncio, :through => :post_anuncio
end