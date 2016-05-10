class Base < ActiveRecord::Migration
	def change
		create_table :usuarios, id: false do |t|
			t.column :idUsuario, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
			t.string :usuario
			t.string :nombre
			t.string :contrasenia

			t.timestamps
		end
		create_table :categorias, id: false do |t|
			t.column :idCategoria, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
			t.string :nombre
			t.integer :activo, :default => 1

			t.timestamps
		end	
		create_table :productos, id: false do |t|
			t.column :idProducto, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
			t.string :nombre
			t.float :precio, :precision => 15, :scale => 2			
			t.float :oferta, :precision => 15, :scale => 2			
			t.integer :idCategoria, references: 'categoria', index: {name:'idx_pro_cat'}, foreign_key: true
			t.string :descripcion
			t.string :foto
			t.date :vigencia
			t.integer :activo, :default => 1
			
			t.timestamps
		end	
	end
end