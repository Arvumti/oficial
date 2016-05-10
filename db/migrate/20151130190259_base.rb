class Base < ActiveRecord::Migration
	def change
		create_table :usuarios, id: false do |t|
			t.column :idUsuario, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
			t.string :usuario
			t.string :nombre
			t.string :contrasenia

			t.timestamps
		end
		create_table  :categorias, id: false do |t|
			t.column  :idCategoria, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
			t.string  :nombre
			t.integer :activo			

			t.timestamps
		end	
		create_table :productos, id: false do |t|
			t.column :idProducto, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
			t.string :usuario
			t.string :nombre
			t.string :contrasenia

			t.timestamps
		end	
	end
end