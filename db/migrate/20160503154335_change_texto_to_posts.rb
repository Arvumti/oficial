class ChangeTextoToPosts < ActiveRecord::Migration
	def up		
		change_column :posts, :texto, :text
	end
	def down		
		change_column :posts, :texto, :string
	end
end