class PostsFotos < ActiveRecord::Migration
	def change
		create_table :posts_fotos, id: false do |t|
			t.column :idPostFoto, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
			t.integer :idPost, references: 'post', index: {name:'idx_posFot_pos'}, foreign_key: true
			t.integer :idGaleria, references: 'galeria', index: {name:'idx_posFot_gal'}, foreign_key: true

			t.timestamps
		end
	end
end
