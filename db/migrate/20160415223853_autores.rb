class Autores < ActiveRecord::Migration
	def change
		create_table :autores, id: false do |t|
			t.column :idAutor, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
			t.string :nombre, :limit => 100
			t.string :informacion, :limit => 1000
			t.string :foto, :limit => 255
			t.string :twitter, :limit => 255
			t.string :facebook, :limit => 255
			t.string :instagram, :limit => 255

			t.timestamps
		end
	end
end
