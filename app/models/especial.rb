class Especial < ActiveRecord::Base
	self.primary_key = :idEspecial
	has_many :especial_detalle, :foreign_key => 'idEspecial'
end