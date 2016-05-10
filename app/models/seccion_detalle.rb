class SeccionDetalle < ActiveRecord::Base
	self.primary_key = :idEspecialDetalle
	belongs_to :especial, :foreign_key => 'idEspecial'
end
