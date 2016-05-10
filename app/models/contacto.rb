class Contacto < ActiveRecord::Base
	self.primary_key = :idComentario	
	validates :email , presence: true
end
